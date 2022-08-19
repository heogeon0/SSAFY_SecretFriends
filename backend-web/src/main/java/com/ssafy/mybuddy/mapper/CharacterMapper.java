package com.ssafy.mybuddy.mapper;

import com.ssafy.mybuddy.dto.CharactersDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CharacterMapper {
    public List<CharactersDto> selectCharacters();
    public CharactersDto selectCharacter(int characterID);
}
