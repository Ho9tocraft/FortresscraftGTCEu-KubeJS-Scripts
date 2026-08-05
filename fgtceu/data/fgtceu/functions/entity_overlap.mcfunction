# Entity Overlap
# アンデッド: 火炎耐性付与
effect give @e[type=#undead] fire_resistance infinite 0 true

# 匠: 爆発威力上昇
execute as @e[type=#fgtceu:creepers_unleashed] unless entity @s[nbt={ExplosionRadius:32b}] run data merge entity @s {ExplosionRadius:32b}

# ウィザー: 色々付く
execute as @e[type=wither,tag=!Recovered] run attribute @s generic.max_health base set 15000
execute as @e[type=wither,tag=!Recovered] run data modify entity @s Health set value 15000
execute as @e[type=wither,tag=!Recovered] run effect give @s absorption infinite 20 true
execute as @e[type=wither,tag=!Recovered] run effect give @s resistance 180 3 true
execute as @e[type=wither,tag=!Recovered] run scoreboard players set @s HEALTH_DET 0
execute as @e[type=wither,tag=!Recovered] run tag @s add Recovered

# ウォーデン: 色々付く
execute as @e[type=warden,tag=!Recovered] run attribute @s generic.max_health base set 62500
execute as @e[type=warden,tag=!Recovered] run data modify entity @s Health set value 62500
execute as @e[type=warden,tag=!Recovered] run attribute @s generic.armor base set 400
execute as @e[type=warden,tag=!Recovered] run attribute @s generic.armor_toughness base set 400
execute as @e[type=warden,tag=!Recovered] run attribute @s generic.attack_damage base set 256
execute as @e[type=warden,tag=!Recovered] run attribute @s generic.attack_knockback base set 4
execute as @e[type=warden,tag=!Recovered] run attribute @s generic.attack_speed base set 8192
execute as @e[type=warden,tag=!Recovered] run attribute @s generic.follow_range base set 1024
execute as @e[type=warden,tag=!Recovered] run tag @s add Recovered
