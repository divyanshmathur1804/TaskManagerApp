package com.TaskManagerApp.Backend.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.TaskManagerApp.Backend.Repositories.UserRepository;

@SpringBootTest // start our application before test to initialize beans
public class UserServiceTests {

    @Autowired
    UserRepository userRepository;

    @Test
    @Disabled // not want to test this everytime 
    void testFindByEmail(){
        assertEquals(4, 2+2); // first parameter is the expected output, second is our resource we need to test
        assertNotNull(userRepository.findUserByEmail("divyanshmathur1804@gmail.com")); // this means the output of the expression should not be null

    }

    @ParameterizedTest
    @CsvSource({
        "1,1,2",
        "4,4,8",
        "7,5,12"
    }) // these are multiple test cases passed to following method
    void generalTestForMultipleCases(int a, int b, int expected){
        assertEquals(expected, a+b);
    }
    
}
