// const attrs =
//     [
//         {
//             "attribute_id": "hkidno",
//             "name": "HKIDCardNumber",
//             "required": true
//         },
//         {
//             "attribute_id": "hkidno",
//             "name": "HKIDCardNumber",
//             "required": true
//         }
//     ];

//     attrs.forEach(item => {
//         console.log(item.name);
//     });
const credential_attributes = [
  {
    attribute_id: 'A-hkidno',
    name: 'HK ID Card Number',
    required: true
  },
  {
    attribute_id: 'A-first_name',
    name: 'First Name',
    required: true
  },
  {
    attribute_id: 'A-last_name',
    name: 'Last Name',
    required: true
  },
  {
    attribute_id: 'A-dob',
    name: 'Date of Birth',
    required: true
  }
  ,
  {
    attribute_id: 'A-gender',
    name: 'Gender',
    required: true
  }
];

const attributes = [{ attribute_id: 'A-first_name', value: 'Steven' },
{ attribute_id: 'A-last_name', value: 'Lam' },
{ attribute_id: 'A-dob',value:"2" },
{ attribute_id: 'A-gender',value:"2asa" },
{ attribute_id: 'A-hkidno',value:"Ands" }];



function validateCredentialAttributes(credential_attributes,attributes){
  const errors = [];
  for (credential_attribute of credential_attributes) {
    var attr_exist = false;
    for (attribute of attributes) {
      if (attribute.attribute_id == credential_attribute.attribute_id) {
        credential_attribute.value = attribute.value;
        attr_exist = true;
        continue;
      }
    }
    if (!attr_exist) {
      errors.push('attribute:' + credential_attribute.attribute_id + " does not exists");
    }
  }
  if(errors.length > 0){
      return {success:false,errors};
  }else{
      return {success:true,credential_attributes};
  }
}

const r = validateCredentialAttributes(credential_attributes,attributes);
if(r){

}
console.log(r);


// const result = dd.filter(word => word.attribute_id != 'hkidno');

// console.log(result);