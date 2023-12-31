# Job Search Engine Application - SWE Final Project

<div>
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white" />
  <img src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white"/>
  <img src="https://img.shields.io/badge/-selenium-%43B02A?style=for-the-badge&logo=selenium&logoColor=white" />
  <img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" />
</div>

## Requirements:
- [x] REST backend using Spring Boot
  - [x] Spring Boot JPA
  - [x] Spring Boot JWT Security
  - [x] Spring REST Template call to external REST service
- [x] Testing
  - [x] JUnit test for each REST API method
  - [x] Minimum of one End-to-End system test using Selenium
- [x] React front end
- [x] Deployed to AWS

_See Pivotal Tracker project for specifics on requirements and stories._

## Contribution Helpers
1. Please use descriptive developement branch names
    - i.e. rather than /dev use /dev-\<my_issue>
2. Refrain from merging your own requests without review/tests done by another group member(s)
3. After adding new dependencies to the Spring Boot application, the project will need to be re-opened before compilations will succeed

### Development Instructions
- Clone the GitHub repository onto local machine with Node installed

**React Application:**
1. Change directory to `/frontend`
2. Initialize the project's dependencies with `npm install`
3. Run the development app with `npm start`

**Spring Boot Server**
1. Create env.properties file in src/main/resources/
2. Add property `jsearch.api-key=` with value of a valid JSearch api key

### Docs
**API(s) used**
- Job Search Results: [JSearch](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)

## Contributors
- Conlyn Pattison
- Marc Garcia
- Dale Sanchez
- Integra Diaz
- Randy Rodriguez
