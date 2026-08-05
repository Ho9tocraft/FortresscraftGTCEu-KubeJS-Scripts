execute as @e[type=wither] at @s store result score @s HEALTH_DET run data get entity @s Health

execute as @e[type=wither,tag=!PShifted] at @s if score @s HEALTH_DET matches ..7500 run tag @s add PShifted
execute as @e[type=wither,tag=PShifted] at @s as @e[type=!wither,distance=..80] run particle ash ~ ~1 ~ 80.0 5.0 80.0 4 1024
execute as @e[type=wither,tag=PShifted] at @s as @e[type=!wither,distance=..80] run damage @s 10.0 wither by @e[type=wither,tag=PShifted,sort=nearest,distance=..3,limit=1]
