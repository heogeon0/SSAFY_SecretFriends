package com.ssafy.mybuddy.service;

import com.ssafy.mybuddy.dto.CharactersDto;

import java.util.List;

public interface CharacterService {
    public List<CharactersDto> allChar();

    public CharactersDto selectChar(int characterID);


}
