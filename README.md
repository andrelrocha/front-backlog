
## 💻 About
This frontend application is designed to seamlessly integrate with the Backlog API, providing users with an intuitive interface to manage their gaming backlog. Built with vanilla JavaScript, CSS, and Bootstrap, it offers a responsive and visually appealing experience. The application utilizes JWT authentication for secure access to the server-side functionalities implemented in Spring Boot.

Check out its usage on a frontend app: https://youtu.be/5CtG81bCaYc [Demo de um App para gerenciar meu backlog]

## 📄 Documentation

- To run the application, ensure the Backlog API server is running.
- Check the visual interface of the documentation at http://localhost:1313/swagger-ui/index.html after its build
- To build and run the project using Maven:
```
mvn package
java -jar target/your-project-name.jar
```
This will first build the project, package it into a JAR file, and then you can execute the JAR using the java -jar command. 
Replace your-project-name.jar with the actual name of your generated JAR file.

## ⚙️ Functionalities

- [x] User-friendly interface for managing gaming backlog efficiently.
- [x] Integration with JWT authentication for secure user login and access to backend resources.
- [x] CRUD operations for various game entities categorized as backlog.
- [x] Easily manageable routine for game entities, allowing users to track their progress effortlessly.
- [x] Image storage and retrieval for finished games, enhancing visual representation on the frontend.
- [x] Manual backup system for data persistence, supporting CSV or XLSX formats.
- [x] Custom search functionality with pagination for a comprehensive and tailored user experience.
- [x] Seamless integration with backend endpoints following the REST standard.
- [x] Cookies Management: Implement a cookies scheme for managing data consumed by the user, ensuring persistent storage of user preferences and settings for an improved user experience.
- [x] JWT Refresh Validation: Develop a refresh system with continuous validation of the JWT, periodically checking its validity and automatically logging out the user if it has expired. This ensures enhanced security and seamless authentication for users throughout their session.
- [x] Custom Lists Management: Implement CRUD operations for custom lists, allowing users to create, read, update, and delete their own games. This feature enables users to organize their gaming backlog based on their preferences and categories, providing a more personalized experience.
- [x] Visual Representation of Entity Lifecycle: Integrate a visual representation of the lifecycle of a game entity, showing its status (such as playing, finished, or backlog) and progress. This can be displayed through graphical elements or progress bars, providing users with a clear overview of their gaming journey and helping them track their progress effortlessly.
      
## 🛠 Technologies
The frontend application leverages the following technologies:

- **[Java 17](https://www.oracle.com/java)**
- **[Spring Boot 3](https://spring.io/projects/spring-boot)**
- **[Maven](https://maven.apache.org)**
- **[JWT](https://jwt.io/)**
- **[BOOTSTRAP](https://getbootstrap.com/)**
- **[THYMELEAF](https://www.thymeleaf.org/)**
- **[JAVASCRIPT](https://developer.mozilla.org/fr/docs/Web/JavaScript)**
- **[HTML](https://developer.mozilla.org/fr/docs/Web/HTML)**
- **[CSS](https://developer.mozilla.org/fr/docs/Web/CSS)**
