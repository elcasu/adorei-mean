# Adorei - Control de stock

## TODO
- Make API with versioned urls

## Backend

RESTFul API that handles all the application logic

### Common CRUD methods

- Get resource list:
  - Endpoint: **/api/resource**
  - HTTP method: GET
  - Params: None
- Get resource details
  - Endpoint: **/api/resource/:resource_id**
  - HTTP method: GET
  - Params: None
- Create a new resource
  - Endpoint: **/api/resource**
  - HTTP method: POST
  - Params: <resource_params>
- Edit existing resource
  - Endpoint: **/api/resource/:resource_id**
  - HTTP method: PUT
  - Params: <resource_params>
- Remove resource
  - Endpoint: **/api/resource/:resource_id**
  - HTTP method: DELETE
  - Params: None
