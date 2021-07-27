// create Role class
class Role {
  //create a constructor function that takes in first name, last name, role, manager, and sets them as properties of the Role
  constructor(name, salary, department_id) {
    this.name = name;
    this.salary = salary;
    this.department_id = department_id;
  }

  getName() {
    return this.name;
  }

  getSalary() {
    return this.salary;
  }

  getDepartment() {
    return this.department_id;
  }
};

// export Role
module.exports = Role;
