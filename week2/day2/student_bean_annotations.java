// Student.java - POJO class without Spring annotations
package com.ai.self.l3.spring;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

public class Student {
    private String name;
    private String dept;
    private Book book1;
    
    // Constructor
    public Student(String name, String dept, Book book1) {
        this.name = name;
        this.dept = dept;
        this.book1 = book1;
    }
    
    // Init method
    public void incrementNoOfStudents() {
        System.out.println("Student " + name + " initialized - incrementing student count");
    }
    
    // Destroy method
    public void decrementNoOfStudents() {
        System.out.println("Student " + name + " being destroyed - decrementing student count");
    }
    
    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDept() { return dept; }
    public void setDept(String dept) { this.dept = dept; }
    public Book getBook1() { return book1; }
    public void setBook1(Book book1) { this.book1 = book1; }
    
    @Override
    public String toString() {
        return "Student{name='" + name + "', dept='" + dept + "', book=" + book1 + "}";
    }
}

// Book.java - Simple Book class
package com.ai.self.l3.spring;

public class Book {
    private String title;
    
    public Book(String title) {
        this.title = title;
    }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    @Override
    public String toString() {
        return "Book{title='" + title + "'}";
    }
}

// AppConfig.java - Configuration class to define beans
package com.ai.self.l3.spring;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
public class AppConfig {
    
    // Define the book bean
    @Bean(name = "hfj")
    public Book headFirstJava() {
        return new Book("Head First Java");
    }
    
    @Bean(name = "effectiveJava")
    public Book effectiveJava() {
        return new Book("Effective Java");
    }
    
    // Define first student bean - equivalent to your XML config
    @Bean(name = "s1", initMethod = "incrementNoOfStudents", destroyMethod = "decrementNoOfStudents")
    @Scope("prototype")
    public Student student1() {
        return new Student("kavya", "AIDS", headFirstJava());
    }
    
    // Define second student bean with different values
    @Bean(name = "s2", initMethod = "incrementNoOfStudents", destroyMethod = "decrementNoOfStudents")
    @Scope("prototype")
    public Student student2() {
        return new Student("rahul", "CSE", effectiveJava());
    }
}

// MainApp.java - Main class with autowiring
package com.ai.self.l3.spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Component;

@Component
public class MainApp {
    
    @Autowired
    @Qualifier("s1")
    private Student student1;
    
    @Autowired
    @Qualifier("s2")
    private Student student2;
    
    public void displayStudents() {
        System.out.println("First Student: " + student1);
        System.out.println("Second Student: " + student2);
        
        // Since scope is prototype, each getBean call creates new instance
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        Student anotherS1 = context.getBean("s1", Student.class);
        Student anotherS2 = context.getBean("s2", Student.class);
        
        System.out.println("Another S1 instance: " + anotherS1);
        System.out.println("Another S2 instance: " + anotherS2);
        
        System.out.println("student1 == anotherS1: " + (student1 == anotherS1)); // false (prototype scope)
    }
    
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        
        // Enable component scanning for MainApp
        context.getAutowireCapableBeanFactory().configureBean(new MainApp(), "mainApp");
        
        // Alternative approach - direct bean retrieval
        Student s1 = context.getBean("s1", Student.class);
        Student s2 = context.getBean("s2", Student.class);
        
        System.out.println("=== Direct Bean Retrieval ===");
        System.out.println("Student 1: " + s1);
        System.out.println("Student 2: " + s2);
        
        // Get another set of instances (prototype scope creates new instances)
        Student s1_another = context.getBean("s1", Student.class);
        Student s2_another = context.getBean("s2", Student.class);
        
        System.out.println("=== Another Set of Instances ===");
        System.out.println("Student 1 (another): " + s1_another);
        System.out.println("Student 2 (another): " + s2_another);
        
        System.out.println("=== Prototype Scope Verification ===");
        System.out.println("s1 == s1_another: " + (s1 == s1_another)); // false
        System.out.println("s2 == s2_another: " + (s2 == s2_another)); // false
        
        // Close context to trigger destroy methods
        ((AnnotationConfigApplicationContext) context).close();
    }
}