from connect import DbConnection

from logger import eprint

table_names = ["SPABBATHI.IUCR", "SPABBATHI.FBI", "KONDURUS.LOCATION", "SPABBATHI.DISTRICT", "SPABBATHI.SEASON", "KONDURUS.DIVISION", "KONDURUS.GEO_COORDINATES", "'YARAVA.VENKATASU'.CRIME_INCIDENT" ]

valid_input_params = {
    'trend1': ["season_name", "crime_type"],
    'trend2': ["district_name", "radius"],
    'trend3': ["day_of_week", "crime_type"],
    'trend4': ["location_type"],
    'trend5': ["crime_category"],
    'trend6': ["demographic_type"]
}

query_list = {
    "signup": """INSERT INTO "YARAVA.VENKATASU".Users (firstname, lastname, password, typeofUser, email) VALUES ('{0}', '{1}', '{2}', '{3}', '{4}')""",

    "login": """SELECT * FROM "YARAVA.VENKATASU".Users WHERE EMAIL = '{0}' AND PASSWORD = '{1}'""",

    "all_tuples_count": "SELECT COUNT(*) AS COUNT FROM {}",

    "trend1": """
SELECT C.Year, I.Primary_Description AS Crime_Type, count(C.Crime_Id) as Number_Of_Crimes
FROM (
  SELECT Crime_Id, EXTRACT(YEAR FROM time_stamp) as Year, EXTRACT(MONTH FROM time_stamp) as Month, Iucr_Code
  FROM "YARAVA.VENKATASU".Crime_Incident 
) C
INNER JOIN "SPABBATHI".IUCR I on I.Iucr_Code = C.Iucr_Code 
INNER JOIN "SPABBATHI".Season S on S.Month = C.Month
WHERE S.Season_name = '{0}' and I.Primary_Description in ({1})
GROUP BY C.Year, I.Primary_Description
ORDER BY C.Year, I.Primary_Description""",

    "trend2": """
SELECT L.Year, L.Month, COUNT(L.Crime_Id) AS Number_Of_Crimes
FROM (
    SELECT K.Crime_Id, K.Year, K.Month,
            6371 * ACOS( COS(K.Latitude/57.2957795) * COS(K.District_Latitude/57.2957795) *
            COS(K.Longitude/57.2957795 - K.District_Longitude/57.2957795) +
            SIN(K.Latitude/57.2957795) * SIN(K.District_Latitude/57.2957795)) AS Distance
    FROM 
    (
        SELECT Crime_Id, EXTRACT(YEAR FROM time_stamp) as Year, EXTRACT(MONTH FROM time_stamp) as Month, G.Latitude, G.Longitude, J.District_Latitude, J.District_Longitude
        FROM "YARAVA.VENKATASU".Crime_Incident CI
        INNER JOIN "SPABBATHI".IUCR I on I.Iucr_Code = CI.Iucr_Code
        INNER JOIN "KONDURUS".LOCATION L ON L.Loc_Id = CI.Loc_Id
        INNER JOIN "KONDURUS".DIVISION D ON L.Division_Id = D.Division_Id
        INNER JOIN "KONDURUS".GEO_COORDINATES G on G.Geo_Id = L.Geo_Id 
        INNER JOIN (
            SELECT District_Id, District_Name, I.Latitude as District_Latitude, I.Longitude as District_Longitude 
            FROM "SPABBATHI".DISTRICT H
            INNER JOIN "KONDURUS".GEO_COORDINATES I on H.Geo_Id = I.Geo_Id
            WHERE H.District_Name = '{0}'
        ) J ON J.District_Id = D.District
        WHERE LATITUDE IS NOT NULL AND LONGITUDE IS NOT NULL
    ) K
    WHERE K.YEAR IN ('2020', '2021', '2022', '2023')
) L
WHERE L.Distance <= {1}
GROUP BY L.Year, L.Month
ORDER BY L.Year, L.Month""",


    "trend3": """
SELECT E.Full_Year AS Year, E.DayOfWeek AS Day, E.Primary_Description AS Crime_Type, COUNT(case_number) AS Number_Of_Crimes
FROM (  
    SELECT * FROM "YARAVA.VENKATASU".Week W
    INNER JOIN 
    (
    SELECT C.Full_Year, C.case_number, C.Primary_Description, MOD((C.Day + 6 + C.Year + C.Code + C.Quotient), 7) as Total
    FROM (
        SELECT B.*, TRUNC(B.year / 4) as Quotient 
        FROM (
        SELECT A.Year as Full_Year, A.case_number, A.Day, SUBSTR(TO_CHAR(A.year), -2) as Year, A.Primary_Description, M.code 
        FROM "SPABBATHI".Season M
        INNER JOIN (
            SELECT CI.time_stamp, 
                CI.case_number,
                EXTRACT(MONTH from CI.time_stamp) as Month, 
                EXTRACT(DAY from CI.time_stamp) as Day , 
                EXTRACT(YEAR from CI.time_stamp) as Year,
                I.Primary_Description
            FROM "YARAVA.VENKATASU".Crime_Incident CI
            INNER JOIN "SPABBATHI".IUCR I on I.Iucr_Code = CI.Iucr_Code
        ) A on M.Month = A.Month
        ) B
    ) C
    ) D ON D.Total=W.Reminder
) E
WHERE E.DayOfWeek IN ({0}) AND E.Primary_Description = '{1}'
GROUP BY E.Full_Year, E.DayOfWeek, E.Primary_Description
ORDER BY E.Full_Year, E.DayOfWeek, E.Primary_Description""",


    "trend4": """
SELECT B.Year, B.Location_Type, count(B.Crime_Id) as Number_Of_Crimes
FROM (
  SELECT A.Crime_Id, A.Year, 
         CASE  
             WHEN A.Loc_Description IN ('RESIDENCE - YARD (FRONT / BACK)', 'RESIDENCE - PORCH / HALLWAY', 'RESIDENCE - GARAGE', 'RESIDENCE PORCH/HALLWAY', 'RESIDENCE-GARAGE', 'RESIDENCE - PORCH / HALLWAY') THEN 'Residential Areas'
             WHEN A.Loc_Description IN ('PARKING LOT / GARAGE (NON RESIDENTIAL)', 'SMALL RETAIL STORE', 'RESTAURANT', 'COMMERCIAL / BUSINESS OFFICE', 'GAS STATION', 'DEPARTMENT STORE', 'GROCERY FOOD STORE', 'BAR OR TAVERN', 'CONVENIENCE STORE', 'DRUG STORE') THEN 'Commercial Areas'
             WHEN A.Loc_Description IN ('COLLEGE / UNIVERSITY - RESIDENCE HALL', 'SCHOOL - PRIVATE BUILDING', 'SCHOOL - PUBLIC GROUNDS', 'SCHOOL, PRIVATE, BUILDING', 'SCHOOL, PRIVATE, GROUNDS', 'SCHOOL, PUBLIC, BUILDING', 'SCHOOL, PUBLIC, GROUNDS', 'COLLEGE / UNIVERSITY - GROUNDS') THEN 'Educational Institutions'
             WHEN A.Loc_Description IN ('SIDEWALK', 'VEHICLE NON-COMMERCIAL', 'CTA TRAIN', 'CTA BUS', 'CTA PLATFORM', 'CHA PARKING LOT / GROUNDS', 'GOVERNMENT BUILDING / PROPERTY', 'CTA STATION', 'VEHICLE - COMMERCIAL', 'CTA PARKING LOT / GARAGE / OTHER PROPERTY') THEN 'Transportation Areas'
             WHEN A.Loc_Description IN ('NURSING / RETIREMENT HOME', 'MEDICAL / DENTAL OFFICE', 'ANIMAL HOSPITAL', 'NURSING HOME/RETIREMENT HOME', 'HOSPITAL', 'HOSPITAL BUILDING / GROUNDS') THEN 'Healthcare Facilities'
             WHEN A.Loc_Description IN ('POLICE FACILITY', 'GOVERNMENT BUILDING / PROPERTY', 'FEDERAL BUILDING', 'COUNTY JAIL', 'POLICE FACILITY / VEHICLE PARKING LOT', 'OTHER RAILROAD PROPERTY / TRAIN DEPOT', 'GOVERNMENT BUILDING / PROPERTY', 'FIRE STATION', 'LIBRARY', 'GOVERNMENT BUILDING / PROPERTY', 'CTA PROPERTY', 'GOVERNMENT BUILDING/PROPERTY') THEN 'Government and Public Facilities'
             ELSE 'Miscellaneous Location'
         END AS Location_Type
  FROM (
    SELECT C.Crime_Id, EXTRACT(YEAR FROM time_stamp) as Year, L.Loc_Description
    FROM "YARAVA.VENKATASU".Crime_Incident C
    INNER JOIN "KONDURUS".Location L on C.Loc_Id = L.Loc_Id
  ) A
  WHERE A.Year BETWEEN '2020' AND '2023'
) B
WHERE B.Location_Type IN ({0})
GROUP BY B.Year, B.Location_Type
ORDER BY B.Year, B.Location_Type""",


    "trend5": """
SELECT Year, LPAD(Month, 2, '0') as Month, Time_Interval, COUNT(Crime_Id) AS Number_Of_Crimes
FROM (
  SELECT A.Year,
         A.Month,
         A.Crime_Id,
         CASE  
             WHEN A.HOUR BETWEEN 4 AND 11 THEN 'Morning'
             WHEN A.HOUR BETWEEN 12 AND 19 THEN 'Evening'
             ELSE 'Night' 
         END AS Time_Interval,
         CASE  
             WHEN A.Index_Code='I' THEN 'Index Crime'
             ELSE 'Non Index Crime'
         END AS Crime_Category
  FROM (
    SELECT Crime_Id, EXTRACT(YEAR FROM time_stamp) as Year, EXTRACT(MONTH FROM time_stamp) as Month, EXTRACT(HOUR FROM time_stamp) as Hour, I.Index_Code
    FROM "YARAVA.VENKATASU".Crime_Incident CI
    INNER JOIN "SPABBATHI".IUCR I ON I.Iucr_Code=CI.Iucr_Code
    ) A
  WHERE A.Year IN ('2020', '2021', '2022', '2023')
  ) B
WHERE B.Crime_Category = '{0}'
GROUP BY Year, Month, Time_Interval
ORDER BY Year, Month, Time_Interval""",


    "trend6": """
SELECT B.Year, B.Demographic_Type, AVG(B.Demographic_Score) AS Demographic_Score
FROM (
  SELECT A.Year,
         A.Demographic_Type,
         CASE  
             WHEN A.Demographic_Type IN ('Age_Low', 'Age_Medium', 'Age_High') THEN 'Age'
             WHEN A.Demographic_Type IN ('Income_Low', 'Income_Medium', 'Income_High') THEN 'Income'
             WHEN A.Demographic_Type IN ('Male', 'Female') THEN 'Gender'
             WHEN A.Demographic_Type IN ('Education_Low', 'Education_Medium', 'Education_High') THEN 'Education'
             WHEN A.Demographic_Type IN ('White', 'African_American', 'Asian_American', 'Hispanic', 'Other') THEN 'Race'
             ELSE 'Trust'
         END AS Demographic_Type_0,
        Demographic_Score
  FROM (
    SELECT Demographic_Type, TO_CHAR(PERIOD, 'YYYY') AS Year, DEMOGRAPHIC_SCORE
    FROM "KONDURUS".police_sentiment_score ) A
) B
WHERE B.Demographic_Type_0 = '{0}'
GROUP BY B.Year, B.Demographic_Type
ORDER BY B.Year, B.Demographic_Type"""

}