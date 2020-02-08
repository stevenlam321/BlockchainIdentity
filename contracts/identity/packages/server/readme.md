# Api endpoints
## HKDID Client App APIs
login
register

## Attributes
```
Method: GET
Path: /attributes
Description:
Params: N/A
Return:
[
    {
        "id": "A-dob",
        "type": "did.attribute",
        "name": "Date of Birth"
    }
]
```
```
Method: GET
Path: /attributes/{attribute_id}
Description:
Params: N/A
Return:
{
    "id": "A-dob",
    "type": "did.attribute",
    "name": "Date of Birth"
}
```
```
Method: POST
Path: /attributes
Description:
Params: id,name
Return:
{
    "id": "A-dob",
    "type": "did.attribute",
    "name": "Date of Birth"
}
```
```
Method: PUT
Path: /attributes/{attribute_id}
Description:
Params: name
Return:
{
    "id": "A-dob",
    "type": "did.attribute",
    "name": "Date of Birth"
}
```
```
Method: DELETE
Path: /attributes/{attribute_id}
Description:
Params: N/A
Return: N/A
```

## Organizations
```
Method: GET
Path: /organizations
Return:
[
    {
        "id": "O-hkimmd",
        "type": "did.organization",
        "name": "Hong Kong Immigration Department",
        "logo": "hkimmd.png"
    }
]
```
```
Method: POST
Path: /organizations/assign_credential,
Params: 
{
    "email":"steven.lam@echk.com.hk",
    "credential_id":"C-hkidcard",
    "attributes":[
        {"attribute_id":"A-dob","value":"2018-10-12"},
        {"attribute_id":"A-first_name","value":"Steven"},
        {"attribute_id":"A-last_name","value":"Lam"},
        {"attribute_id":"A-gender","value":"M"},
        {"attribute_id":"A-hkidno","value":"A12345(7)"}
    ]
}
Return: 

```
## Attributes
```
Method: GET
Path: /attributes
Return:
[
    {
        "id": "A-dob",
        "type": "did.attribute",
        "name": "Date of Birth"
    }
]
```
## Credentials
```
Method: GET
Path: /credentials
Return:
[
    {
        "id": "C-hkidcard",
        "type": "did.credential",
        "name": "Hong Kong Identity Card",
        "organization_id": "O-hkimmd",
        "organization": {
            "id": "O-hkimmd",
            "type": "did.organization",
            "name": "Hong Kong Immigration Department",
            "logo": "hkimmd.png"
        },
        "attributes": [
            {
                "id": "A-hkidno",
                "name": "HK ID Card Number"
            },
            {
                "id": "A-first_name",
                "name": "First Name"
            },
            {
                "id": "A-last_name",
                "name": "Last Name"
            },
            {
                "id": "A-dob",
                "name": "Date of Birth"
            },
            {
                "id": "A-gender",
                "name": "Gender"
            }
        ]
    }
]
```
```
Method: POST
Path: /credentials
Return: 
```
