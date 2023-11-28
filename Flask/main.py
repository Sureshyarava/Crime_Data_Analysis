from connect import DbConnection

from logger import eprint

table_names = ["SPABBATHI.IUCR", "SPABBATHI.FBI", "KONDURUS.LOCATION", "SPABBATHI.DISTRICT", "SPABBATHI.SEASON", "KONDURUS.DIVISION", "KONDURUS.GEO_COORDINATES"]

valid_input_params = {
    'trend1': ["season_name", "crime_type"],
    'trend2': ["district_name", "radius"],
    'trend3': ["day_of_week", "crime_type"],
    'trend5': ["crime_category"]
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


    "trend5": """
SELECT Time_Period, Time_Interval, COUNT(Crime_Id) AS Number_Of_Crimes
FROM (
  SELECT CONCAT(CONCAT(A.Year, '-'), LPAD(A.Month, 2, '0')) AS Time_Period,
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
GROUP BY Time_Period, Time_Interval
ORDER BY Time_Period, Time_Interval"""
}



locations_hierarchy = {
    "Residential Areas": [
        "RESIDENCE - YARD (FRONT / BACK)",
        "RESIDENCE - PORCH / HALLWAY",
        "RESIDENCE - GARAGE",
        "RESIDENCE PORCH/HALLWAY",
        "RESIDENCE-GARAGE",
        "RESIDENCE - PORCH / HALLWAY",
    ],
    "Commercial Areas": [
        "PARKING LOT / GARAGE (NON RESIDENTIAL)",
        "TAVERN / LIQUOR STORE",
        "AUTO / BOAT / RV DEALERSHIP",
        "APPLIANCE STORE",
        "CLEANING STORE",
        "GROCERY FOOD STORE",
        "CURRENCY EXCHANGE",
        "DEPARTMENT STORE",
        "SMALL RETAIL STORE",
        "GAS STATION",
        "DRUG STORE",
        "MOTEL",
        "CONVENIENCE STORE",
        "RESTAURANT",
        "BAR OR TAVERN",
        "AIRPORT TERMINAL LOWER LEVEL - NON-SECURE AREA",
        "FACTORY / MANUFACTURING BUILDING",
        "NEWSSTAND",
        "COMMERCIAL / BUSINESS OFFICE",
        "AIRPORT TERMINAL UPPER LEVEL - SECURE AREA",
        "CHA HALLWAY / STAIRWELL / ELEVATOR",
        "LAUNDRY ROOM",
        "WAREHOUSE",
        "MOVIE HOUSE / THEATER",
        "RETAIL STORE",
        "LIVERY STAND OFFICE",
        "BARBERSHOP",
        "COACH HOUSE",
        "TRUCKING TERMINAL",
        "BOWLING ALLEY",
        "CLUB",
        "CHURCH / SYNAGOGUE / PLACE OF WORSHIP",
        "POOL ROOM",
        "JUNK YARD/GARBAGE DUMP",
        "ROOMING HOUSE",
        "CHA PLAY LOT",
        "POOLROOM",
        "SAVINGS AND LOAN",
        "VEHICLE - COMMERCIAL",
        "AIRPORT EXTERIOR - SECURE AREA",
        "AIRPORT EXTERIOR - NON-SECURE AREA",
        "AIRPORT TERMINAL MEZZANINE - NON-SECURE AREA",
        "LIVERY AUTO",
        "MEDICAL/DENTAL OFFICE",
        "CHA HALLWAY/STAIRWELL/ELEVATOR",
        "COLLEGE/UNIVERSITY GROUNDS",
        "FACTORY/MANUFACTURING BUILDING",
        "DELIVERY TRUCK",
        "COLLEGE/UNIVERSITY RESIDENCE HALL",
        "CHA APARTMENT",
        "SPORTS ARENA / STADIUM",
        "OTHER COMMERCIAL TRANSPORTATION",
        "JAIL / LOCK-UP FACILITY",
        "OTHER",
        "CHA PARKING LOT",
        "RAILROAD PROPERTY",
        'CTA "L" PLATFORM',
        "CHA BREEZEWAY",
        "OTHER RAILROAD PROP / TRAIN DEPOT",
        "CTA SUBWAY STATION",
        "PUBLIC HIGH SCHOOL",
        "COMMERCIAL / BUSINESS OFFICE",
        "HIGHWAY / EXPRESSWAY",
        "FACTORY / MANUFACTURING BUILDING",
        "AUTO",
        "CHA PARKING LOT/GROUNDS",
        "AIRPORT TERMINAL LOWER LEVEL - SECURE AREA",
        "AIRPORT TERMINAL UPPER LEVEL - NON-SECURE AREA",
        "OTHER RAILROAD PROPERTY / TRAIN DEPOT",
        "GOVERNMENT BUILDING",
        "COUNTY JAIL",
        "TRAILER",
        "BASEMENT",
        "GANGWAY",
        "LIVERY AUTO",
        "AIRPORT TERMINAL UPPER LEVEL - NON-SECURE AREA",
        "EXPRESSWAY EMBANKMENT",
        "AIRPORT TERMINAL LOWER LEVEL - SECURE AREA",
        "OTHER",
        "VEHICLE - OTHER RIDE SHARE SERVICE (LYFT, UBER, ETC.)",
        "AIRPORT EXTERIOR - SECURE AREA",
        "AIRPORT EXTERIOR - NON-SECURE AREA",
        "BOWLING ALLEY",
        "AIRPORT TERMINAL MEZZANINE - NON-SECURE AREA",
        "PORCH",
        "STAIRWELL",
        "DUMPSTER",
        "LIQUOR STORE",
        "CLUB",
        "COACH HOUSE",
        "TRUCKING TERMINAL",
        "PRAIRIE",
        "CHURCH/SYNAGOGUE/PLACE OF WORSHIP",
    ],
    "Educational Institutions": [
        "COLLEGE / UNIVERSITY - RESIDENCE HALL",
        "SCHOOL - PRIVATE BUILDING",
        "SCHOOL - PUBLIC GROUNDS",
        "SCHOOL, PRIVATE, BUILDING",
        "SCHOOL, PRIVATE, GROUNDS",
        "SCHOOL, PUBLIC, BUILDING",
        "SCHOOL, PUBLIC, GROUNDS",
        "COLLEGE / UNIVERSITY - GROUNDS",
    ],
    "Transportation Areas": [
        "CTA BUS",
        "VEHICLE - DELIVERY TRUCK",
        "CTA GARAGE / OTHER PROPERTY",
        "SIDEWALK",
        "DRIVEWAY",
        "HIGHWAY/EXPRESSWAY",
        "VEHICLE - COMMERCIAL",
        "CTA PARKING LOT / GARAGE / OTHER PROPERTY",
        "OTHER RAILROAD PROP / TRAIN DEPOT",
        "CTA SUBWAY STATION",
        "CTA TRAIN",
        "TAXICAB",
        "CTA PLATFORM",
        "CTA STATION",
        "TAXICAB",
        "AIRPORT TRANSPORTATION SYSTEM (ATS)",
        "TAXICAB",
        "AIRPORT VENDING ESTABLISHMENT",
        "VEHICLE - COMMERCIAL: ENTERTAINMENT / PARTY BUS",
        "RAILROAD PROPERTY",
        "CHA ELEVATOR",
        "VEHICLE NON-COMMERCIAL",
        "CTA TRACKS - RIGHT OF WAY",
        "GOVERNMENT BUILDING / PROPERTY",
        "AIRPORT BUILDING NON-TERMINAL - NON-SECURE AREA",
        "CHA STAIRWELL",
        "GOVERNMENT BUILDING/PROPERTY",
        "SPORTS ARENA/STADIUM",
        "CHA PARKING LOT / GROUNDS",
        "AIRPORT TRANSPORTATION SYSTEM (ATS)",
        "CTA TRACKS - RIGHT OF WAY",
        "CTA SUBWAY STATION",
        "AIRPORT BUILDING NON-TERMINAL - SECURE AREA",
        "TAXICAB",
        "LIVERY STAND OFFICE",
        "TAXI CAB",
        "TRUCKING TERMINAL",
        "AIRPORT BUILDING NON-TERMINAL - SECURE AREA",
        "KENNEL",
    ],
    "Healthcare Facilities": [
        "NURSING / RETIREMENT HOME",
        "MEDICAL / DENTAL OFFICE",
        "ANIMAL HOSPITAL",
        "NURSING HOME/RETIREMENT HOME",
        "HOSPITAL",
        "HOSPITAL BUILDING / GROUNDS",
    ],
    "Government and Public Facilities": [
        "POLICE FACILITY",
        "GOVERNMENT BUILDING / PROPERTY",
        "FEDERAL BUILDING",
        "COUNTY JAIL",
        "POLICE FACILITY / VEHICLE PARKING LOT",
        "OTHER RAILROAD PROPERTY / TRAIN DEPOT",
        "GOVERNMENT BUILDING / PROPERTY",
        "FIRE STATION",
        "LIBRARY",
        "GOVERNMENT BUILDING / PROPERTY",
        "CTA PROPERTY",
        "GOVERNMENT BUILDING/PROPERTY",
    ],
    "Outdoor Areas": [
        "CEMETERY",
        "LAKEFRONT/WATERFRONT/RIVERBANK",
        "RIVER",
        "FOREST PRESERVE",
        "VACANT LOT",
        "LAKE",
        "BEACH",
        "LAGOON",
        "PRAIRIE",
        "WOODED AREA",
    ],
    "Miscellaneous Locations": [
        "OTHER (SPECIFY)",
        "PAWN SHOP",
        "CHA HALLWAY / STAIRWELL / ELEVATOR",
        "ROOF",
        "FUNERAL PARLOR",
        "YMCA",
        "OTHER COMMERCIAL TRANSPORTATION",
        "ALLEY",
        "VEHICLE - OTHER RIDE SHARE SERVICE (LYFT, UBER, ETC.)",
        "AIRPORT EXTERIOR - SECURE AREA",
        "AIRPORT EXTERIOR - NON-SECURE AREA",
        "BOWLING ALLEY",
        "AIRPORT TERMINAL MEZZANINE - NON-SECURE AREA",
        "PORCH",
        "STAIRWELL",
        "RIVER BANK",
        "DUMPSTER",
        "LIQUOR STORE",
        "CLUB",
        "COACH HOUSE",
        "TRUCKING TERMINAL",
        "PRAIRIE",
        "CHURCH / SYNAGOGUE / PLACE OF WORSHIP",
    ],
}
