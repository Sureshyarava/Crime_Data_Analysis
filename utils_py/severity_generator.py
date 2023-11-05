import csv

#Mapping of primary_description to severity values
severity_mapping = {
    'ARSON': 3,
    'ASSAULT': 4,
    'BATTERY': 3,
    'BURGLARY': 3,
    'CONCEALED CARRY LICENSE VIOLATION': 2,
    'CRIMINAL ABORTION': 2,
    'CRIMINAL DAMAGE': 3,
    'CRIMINAL SEXUAL ASSAULT': 5,
    'CRIMINAL TRESPASS': 2,
    'DECEPTIVE PRACTICE': 2,
    'GAMBLING': 2,
    'HOMICIDE': 5,
    'HUMAN TRAFFICKING': 5,
    'INTERFERENCE WITH PUBLIC OFFICER': 2,
    'INTIMIDATION': 2,
    'KIDNAPPING': 5,
    'LIQUOR LAW VIOLATION': 2,
    'MOTOR VEHICLE THEFT': 3,
    'NARCOTICS': 3,
    'NON-CRIMINAL': 1,
    'OBSCENITY': 2,
    'OFFENSE INVOLVING CHILDREN': 4,
    'OTHER NARCOTIC VIOLATION': 3,
    'OTHER OFFENSE': 2,
    'PROSTITUTION': 2,
    'PUBLIC INDECENCY': 2,
    'PUBLIC PEACE VIOLATION': 2,
    'RITUALISM': 2,
    'ROBBERY': 4,
    'SEX OFFENSE': 4,
    'STALKING': 3,
    'THEFT': 3,
    'WEAPONS VIOLATION': 3,
}

# Input and Output CSV files
input_file = 'IUCR_Refined.csv'
output_file = 'IUCR_Refined_New.csv'

# Name of new column
new_column_name = 'severity'

#To read input data
data = []
with open(input_file, 'r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    data = [row for row in csv_reader]

for row in data:
    row[new_column_name] = severity_mapping.get(row['primary_description'], 0)

with open(output_file, 'w', newline='') as csv_file:
    fieldnames = data[0].keys()
    csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    csv_writer.writeheader()
    csv_writer.writerows(data)