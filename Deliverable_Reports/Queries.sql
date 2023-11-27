-- Trend Query 1
SELECT C.Year, I.Primary_Description AS Crime_Type, count(C.Crime_Id) as Number_Of_Crimes
FROM (
  SELECT Crime_Id, EXTRACT(YEAR FROM time_stamp) as Year, EXTRACT(MONTH FROM time_stamp) as Month, Iucr_Code
  FROM "YARAVA.VENKATASU".Crime_Incident 
) C
INNER JOIN "SPABBATHI".IUCR I on I.Iucr_Code = C.Iucr_Code 
INNER JOIN "SPABBATHI".Season S on S.Month = C.Month
WHERE S.Season_name = 'summer' and I.Primary_Description in ('THEFT','CRIMINAL DAMAGE')
GROUP BY C.Year, I.Primary_Description
ORDER BY C.Year, I.Primary_Description;

-- Trend Query 3
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
WHERE E.DayOfWeek IN ('tuesday') AND E.Primary_Description = 'THEFT'
GROUP BY E.Full_Year, E.DayOfWeek, E.Primary_Description
ORDER BY E.Full_Year, E.DayOfWeek, E.Primary_Description;