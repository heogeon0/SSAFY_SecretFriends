package com.ssafy.mybuddy.controller;


import com.ssafy.mybuddy.dto.CharactersDto;
import com.ssafy.mybuddy.service.CharacterService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api("CharacterController")
@RestController
@RequestMapping("/character")
public class CharacterController {

    @Autowired
    private CharacterService characterService;

    @ApiOperation(value="모든 캐릭터 조회", notes="등록된 모든 캐릭터의 정보를 return한다", response = String.class)
    @GetMapping
    public ResponseEntity<List<CharactersDto>> allChar() throws Exception{
        return new ResponseEntity<List<CharactersDto>>(characterService.allChar(),HttpStatus.OK);
    }

    @ApiOperation(value="아이의 캐릭터 조회", notes="로그인된 아이의 캐릭터 하나의 정보를 return한다", response = String.class)
    @GetMapping("{ID}")
    public ResponseEntity<CharactersDto> selectChar(@PathVariable int ID){
        return new ResponseEntity<CharactersDto>(characterService.selectChar(ID), HttpStatus.OK);
    }

}
