package com.example.user.service;

import com.example.user.dto.UpdateUserInfoRequest;
import com.example.user.model.User;
import com.example.user.repository.UserRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public Optional<User> getUserById(final Long userId) {
        return userRepository.findById(userId);
    }

    public Optional<User> updateUserInfo(UpdateUserInfoRequest request) {
        Optional<User> findUser = userRepository.getUserByLogin(request.getLogin());

        if (findUser.isPresent()) {
            User user = findUser.get();

            if (request.getAge() != null && !request.getAge().equals(user.getAge())) {
                user.setAge(request.getAge());
            }
            if (request.getSex() != null && !request.getSex().equals(user.getSex())) {
                user.setSex(request.getSex());
            }
            if (request.getMail() != null && !request.getMail().equals(user.getMail())) {
                user.setMail(request.getMail());
            }
            if (request.getWeight() != null && !request.getWeight().equals(user.getWeight())) {
                user.setWeight(request.getWeight());
            }
            if (request.getHeight() != null && !request.getHeight().equals(user.getHeight())) {
                user.setHeight(request.getHeight());
            }
            if (request.getPhysicalActivity() != null && !request.getSex().equals(user.getPhysicalActivity())) {
                user.setPhysicalActivity(request.getPhysicalActivity());
            }
            if (request.getIsNotify() != null && !request.getIsNotify().equals(user.getIsNotify())) {
                user.setIsNotify(request.getIsNotify());
            }


            return Optional.of(userRepository.save(user));
        }
        return Optional.empty();
    }

    public Optional<User> save(final User user) {
        Optional<User> findUser = userRepository.getUserByLogin(user.getLogin());

        if (findUser.isEmpty()) {
            User savedUser = userRepository.save(user);

            return Optional.of(savedUser);
        }
        return Optional.empty();
    }

    public Optional<User> getByCredentials(final User user) {
        return userRepository.getUserByLoginAndPassword(user.getLogin(), user.getPassword());
    }
}
