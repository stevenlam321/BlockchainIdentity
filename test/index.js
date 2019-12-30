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

const dd = [
    {
      "attribute_id": "hkidno",
      "name": "HKIDCardNumber",
      "required": true
    },
    {
      "attribute_id": "hkidno",
      "name": "HKIDCardNumber",
      "required": true
    },
    {
      "attribute_id": "A-last_name",
      "name": "Last Name",
      "required": false
    },
    {
      "attribute_id": "A-last_name",
      "name": "Last Name",
      "required": false
    },
    {
      "attribute_id": "A-last_name",
      "name": "Last Name",
      "required": false
    }
  ]

  const result = dd.filter(word => word.attribute_id != 'hkidno');

  console.log(result);