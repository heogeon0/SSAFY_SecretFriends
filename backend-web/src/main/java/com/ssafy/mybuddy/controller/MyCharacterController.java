package com.ssafy.mybuddy.controller;


import com.ssafy.mybuddy.dto.MycharacterDto;
import com.ssafy.mybuddy.service.MyCharacterService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("MycharacterController")
@RestController
@CrossOrigin("*")
@RequestMapping("/mycharacter")
public class MyCharacterController {

    @Autowired
    MyCharacterService myCharacterService;

    @ApiOperation(value="선택한 캐릭터정보 등록", notes="로그인된 아이가 선택한 캐릭터 정보를 등록한다", response = String.class)
    @PostMapping
    public ResponseEntity<String> insertMyCharacter(@RequestBody  @ApiParam(value = "characterID, childrenID, nickname 필요", required = true) MycharacterDto mycharacterDto){
        if (myCharacterService.insertMyCharacter(mycharacterDto)){
            return new ResponseEntity<String>("success",HttpStatus.OK);
        }
        return new ResponseEntity<String>("fail",HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value="캐릭터 정보 확인", notes="로그인된 아이가 등록한 캐릭터의 정보를 return", response = String.class)
    @GetMapping("{childrenID}")
    public ResponseEntity<MycharacterDto> selectMyCharacter(@PathVariable int childrenID){
        return new ResponseEntity<MycharacterDto>(myCharacterService.selectMyCharacter(childrenID),HttpStatus.OK);
    }

    @ApiOperation(value="캐릭터 정보 확인(IOT)", notes="로그인된 아이가 등록한 캐릭터의 정보를 return", response = String.class)
    @GetMapping("iot/{childrenID}")
    public ResponseEntity<MycharacterDto> selectMyCharacterForIot(@PathVariable int childrenID){
        return new ResponseEntity<MycharacterDto>(myCharacterService.selectMyCharacter(childrenID),HttpStatus.OK);
    }

    @ApiOperation(value="캐릭터 정보 수정", notes="로그인된 아이가 등록한 캐릭터의 정보를 수정", response = String.class)
    @PutMapping("{childrenID}")
    public ResponseEntity<String> updateMyCharacter(@RequestBody  @ApiParam(value = "childrenID, characterID, nickname 필요", required = true) MycharacterDto mycharacterDto){
        if (myCharacterService.updateMyCharacter(mycharacterDto)){
            return new ResponseEntity<String>("success", HttpStatus.OK);
        }
        return new ResponseEntity<String>("fail",HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value="캐릭터 정보 삭제", notes="로그인된 아이가 등록한 캐릭터의 정보를 삭제", response = String.class)
    @DeleteMapping("{childrenID}")
    public ResponseEntity<String> deleteMycharacter(@PathVariable int childrenID){
        if (myCharacterService.deleteMyCharacter(childrenID)){
            return new ResponseEntity<String>("success", HttpStatus.OK);
        }
        return new ResponseEntity<String>("fail",HttpStatus.NO_CONTENT);
    }
}
