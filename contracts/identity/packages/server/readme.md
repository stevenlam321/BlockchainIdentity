# Api endpoints
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