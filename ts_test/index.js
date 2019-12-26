const attributeFields = [
    {
      id: "first_name",
      name: "First Name",
    },
    {
      id: "last_name",
      name: "Last Name",
    },
    {
      id: "gender",
      name: "Gender",
    },
    {
      id: "dob",
      name: "Date of Birth",
    }
  ];
  for(const i in attributeFields){
      const data = attributeFields[i];
    console.log(data);
  }
//   attributeFields.forEach(attributeField => {
//     console.log(attributeField);
//   });