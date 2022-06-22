// Your code here
function createEmployeeRecord (employeeArray){
return {     
  firstName :employeeArray[0],
  familyName :employeeArray[1],
  title :employeeArray[2],
  payPerHour:employeeArray[3],
  timeInEvents : [],
  timeOutEvents :[]
}
}

function createEmployeeRecords(records){
  return records.map(worker=>createEmployeeRecord(worker))

}

function createTimeInEvent(array,dateObj){
  const year = dateObj.slice(0,10);
  const hour = dateObj.slice(-4)
  const time ={
      type:"TimeIn",
      date :year,
      hour:parseInt(hour)
  }
  let updateRecord = createEmployeeRecord(array);
  updateRecord.timeInEvents.push(time)

  return updateRecord;
}





function createTimeOutEvent(record, timestamp){
  const duration = {
      type: "TimeOut",
      date: timestamp.split(" ")[0],
      hour: parseInt(timestamp.slice(-4), 10)
  }
  record.timeOutEvents.push(duration)
  return record
}

const hoursWorkedOnDate = (employee, findDate) => {
    let setDate = employee.timeInEvents.find(e => {
        return e.date === findDate
    })
    let outDate = employee.timeInEvents.find(variable=> {
        return variable.date === findDate
    })
  
    return (outDate.hour - setDate.hour) / 100
  } 

// function hoursWorkedOnDate(record, date){
//   const timeIn = record.timeInEvents.find(e => {
//       return e.date === date
//   })

//   const timeOut = record.timeOutEvents.find(e => {
//       return e.date === date
//   })

//   return (timeOut.hour - timeIn.hour) / 100
// }
// hoursWorkedOnDate()

function wagesEarnedOnDate(record, date){
  return hoursWorkedOnDate(record, date) * record.payPerHour
}
// wagesEarnedOnDate()

function allWagesFor(record){
  let pay = 0;
  for(let i = 0; i < record.timeInEvents.length; i++){
      let payDay = wagesEarnedOnDate(record, record.timeInEvents[i].date)
      pay += payDay
  }
  return pay
}

function calculatePayroll(arr){

  const totalPay = arr.reduce((acc, record) => {
      const totalPay = allWagesFor(record)
      return acc + totalPay
  }, 0)
  return totalPay
}

// function createTimeOutEvent(employee,dateObj){
//   let year = dateObj.slice(0,10);
//   let hour = dateObj.slice(-4)
//   employee.timeOutEvents.push({
//       type:"TimeOut",
//       date :year,
//       hour:parseInt(hour)
//   })


//   return employee;

// }

