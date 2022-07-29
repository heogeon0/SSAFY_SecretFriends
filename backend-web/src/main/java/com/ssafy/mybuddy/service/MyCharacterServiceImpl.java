package com.ssafy.mybuddy.service;


import com.ssafy.mybuddy.dto.MycharacterDto;
import com.ssafy.mybuddy.mapper.MyCharactermapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MyCharacterServiceImpl implements MyCharacterService{
    @Autowired
    MyCharactermapper myCharactermapper;

    @Override
    public MycharacterDto selectMyCharacter(int childrenId) {
        return myCharactermapper.selectMyCharacter(childrenId);
    }

    @Override
    public boolean insertMyCharacter(MycharacterDto mycharacterDto) {
        return myCharactermapper.insertMyCharacter(mycharacterDto)==1;
    }

    @Override
    public boolean updateMyCharacter(MycharacterDto mycharacterDto) {
        return myCharactermapper.updateMyCharacter(mycharacterDto)==1;
    }

    @Override
    public boolean deleteMyCharacter(int characterId) {
        return myCharactermapper.deleteMyCharacter(characterId)==1;
    }
}
