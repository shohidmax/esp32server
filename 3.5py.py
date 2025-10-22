import datetime
date = datetime.datetime.now()
month = date.month
day = date.day
year = date.year
hour = date.hour
minutes = date.minute
seconds = date.second
surv = [
        {
         "id": "8901157001143",
         "Name": "asad",
         "Age": 18,
         "Income":5000
        },
        {
         "id": "8901157001143",
         "Name": "asad",
         "Age": 19,
         "Income":6000
        },
        {
         "id": "8901157001143",
         "Name": "asad",
         "Age": 17,
         "Income":3000
        }
       ]
def addData(e):
    # take_input_with_data
    id = year + day + hour + minutes + seconds + 1
    Name = 'inut'
    Age = 33
    Income = 2500
    obj = {id, Name, Age, Income}
    surv.append(obj)
    print(len(surv), surv)
Avgyears = 0
avgIncome = 0
for sur in surv:
    Avgyears = Avgyears + sur.Age / len(surv)
    avgIncome = avgIncome + surv.Income / len(surv)
print('avarage Income', avgIncome, 'Avarage years', Avgyears)
