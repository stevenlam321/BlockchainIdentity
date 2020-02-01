hurl invoke did person_create '{"id":"p0003","email":"steven.lam@echk.com.hk","country_code":"852","mobile":"63742615"}'


hurl invoke did organization_assisn_credential '{"person_id":"p0001","credential_id":"C-hkidcard","attributes":[{"attribute_id":"A-hkidno","value":"R371003(2)"},{"attribute_id":"A-first_name","value":"Steven"},{"attribute_id":"A-last_name","value":"Lam"},{"attribute_id":"A-dob","value":"2000-01-01"},{"attribute_id":"A-gender","value":"M"}]}'



hurl invoke did organization_assisn_credential steven.lam@echk.com.hk C-hkidcard '[{"attribute_id":"A-dob","value":"2018-10-12"},{"attribute_id":"A-first_name","value":"Steven"},{"attribute_id":"A-last_name","value":"Lam"},{"attribute_id":"A-gender","value":"M"},{"attribute_id":"A-hkidno","value":"A12345(7)"}]'



Field should be exist, but allow null value
  @Required()
  @Validate(yup.string().nullable())
  public mobile: string;