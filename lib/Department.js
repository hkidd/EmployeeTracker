// create Department class
class Department {
  //create a constructor function that takes in first name, last name, role, manager, and sets them as properties of the department
  constructor(name) {
    this.name = name;
    // this.id = id;
  }

  getName() {
    return this.name;
  }
}

// export Department
module.exports = Department;
