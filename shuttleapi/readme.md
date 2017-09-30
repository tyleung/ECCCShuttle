## ECCC Shuttle App API

### To run locally:
Server:\
`cd ECCCShuttle/shuttleapi`\
`php -S localhost:8000 -t public/`

Adminer:\
`cd ECCCShuttle/adminer`\
`php -S localhost:8001`


### To update the ECCC server files:
- Login to the FTP server
- Transfer everything from local shuttleapi folder to server shuttleapi folder EXCEPT for the .env file
- Copy over changes to the server .env file if there are any
- Copy over the public/.htaccess file to the server root if there are any changes

To make api calls to the ECCC server:\
`http://shuttle.eccc.ca/api/v1/*`

To modify the ECCC server database:\
`http://shuttle.eccc.ca/phpmyadmin/`
