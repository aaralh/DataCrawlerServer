# datacrawlerserver
Two nodejs servers. First one for crawling data to database from certain API and second one serving it for client via REST.

## How to use
Both data crawler and the REST API are own servers so you can start the crawler without having the REST running and vice versa.
For now the crawler will save all data to sqlite3 database. 
- IMPORTANT NOTE: Run the starting node command in root folder of the repository so the files will be in right places for both servers to access them 
