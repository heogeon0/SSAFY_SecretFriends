package com.ssafy.mybuddy.service;


import com.ssafy.mybuddy.dto.MycharacterDto;

public interface MyCharacterService {

    public MycharacterDto selectMyCharacter(int childrenId);

    public boolean insertMyCharacter(MycharacterDto mycharacterDto);

    public boolean updateMyCharacter(MycharacterDto mycharacterDto);

    public boolean deleteMyCharacter(int characterId);
}
