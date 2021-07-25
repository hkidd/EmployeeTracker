// create Employee class
class Employee {
  //create a constructor function that takes in first name, last name, role, manager, and sets them as properties of the employee
  constructor(firstName, lastName, role, manager) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.manager = manager;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

};

// export Employee
module.exports = Employee;
