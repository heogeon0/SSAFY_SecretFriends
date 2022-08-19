package com.ssafy.mybuddy.service;

import com.ssafy.mybuddy.dto.CharactersDto;
import com.ssafy.mybuddy.mapper.CharacterMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CharacterServiceImpl implements CharacterService{

    @Autowired
    private CharacterMapper characterMapper;

    @Override
    public List<CharactersDto> allChar() {
        return characterMapper.selectCharacters();
    }

    @Override
    public CharactersDto selectChar(int characterID) {
        return characterMapper.selectCharacter(characterID);
    }
}
