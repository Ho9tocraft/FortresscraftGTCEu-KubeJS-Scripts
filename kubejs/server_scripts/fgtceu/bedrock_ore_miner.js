/**
 * Bedrock Ore Veins
 */

const DimMap = {
    overworld: 'minecraft:overworld',
    nether: 'minecraft:the_nether',
    the_end: 'minecraft:the_end',
    kakuriyo: 'urushi:kakuriyo',
    tforest: 'twilightforest:twilight_forest'
};
const FGTCEuOreMaterials = {
    Mithrite: GTMaterials.get('mithrite'),
    Lumithrite: GTMaterials.get('lumithrite'),
    EikonMithrite: GTMaterials.get('eikon_mithrite'),
    NatureAbysslinker: GTMaterials.get('blood_starved_mithril'),
    Durium: GTMaterials.get('durium'),
    EFire: GTMaterials.get('fire_gem'),
    EWind: GTMaterials.get('wind_gem'),
    ELightning: GTMaterials.get('lightning_gem'),
    EIce: GTMaterials.get('ice_gem'),
    EWater: GTMaterials.get('water_gem'),
    EEarth: GTMaterials.get('earth_gem'),
};

GTCEuServerEvents.bedrockOreVeins(event => {
    // Overworld
    {
        event.add('overworld_mithrite', vein => {
            vein.weight(50).size(4).yield(10, 20)
                .material(FGTCEuOreMaterials.Mithrite, 5)
                .material(FGTCEuOreMaterials.Lumithrite, 3)
                .material(FGTCEuOreMaterials.EikonMithrite, 3)
                .material(FGTCEuOreMaterials.Durium, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_oilsands', vein => {
            vein.weight(50).size(5).yield(20, 40)
                .material(GTMaterials.Oilsands, 5)
                .material(GTMaterials.Oilsands, 3)
                .material(GTMaterials.Oilsands, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_gypsum', vein => {
            vein.weight(40).size(3).yield(10, 30)
                .material(GTMaterials.BasalticMineralSand, 3)
                .material(GTMaterials.GraniticMineralSand, 2)
                .material(GTMaterials.FullersEarth, 2)
                .material(GTMaterials.Gypsum, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_apatite', vein => {
            vein.weight(20).size(3).yield(10, 30)
                .material(GTMaterials.Apatite, 3)
                .material(GTMaterials.TricalciumPhosphate, 3)
                .material(GTMaterials.Pyrochlore, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_olivine', vein => {
            vein.weight(30).size(5).yield(10, 40)
                .material(GTMaterials.Bentonite, 3)
                .material(GTMaterials.Magnesite, 2)
                .material(GTMaterials.Olivine, 2)
                .material(GTMaterials.GlauconiteSand, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_soapstone', vein => {
            vein.weight(40).size(3).yield(10, 20)
                .material(GTMaterials.Soapstone, 3)
                .material(GTMaterials.Talc, 2)
                .material(GTMaterials.GlauconiteSand, 2)
                .material(GTMaterials.Pentlandite, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_platinum', vein => {
            vein.weight(10).size(3).yield(10, 15)
                .material(GTMaterials.Bornite, 3)
                .material(GTMaterials.Cooperite, 2)
                .material(GTMaterials.Palladium, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_copper_tin', vein => {
            vein.weight(30).size(5).yield(20, 30)
                .material(GTMaterials.Chalcopyrite, 5)
                .material(GTMaterials.Zeolite, 2)
                .material(GTMaterials.Cassiterite, 2)
                .material(GTMaterials.Realgar, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_salt', vein => {
            vein.weight(30).size(3).yield(20, 40)
                .material(GTMaterials.RockSalt, 3)
                .material(GTMaterials.Salt, 2)
                .material(GTMaterials.Lepidolite, 1)
                .material(GTMaterials.Spodumene, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_topaz', vein => {
            vein.weight(10).size(3).yield(10, 20)
                .material(GTMaterials.BlueTopaz, 3)
                .material(GTMaterials.Topaz, 2)
                .material(GTMaterials.Chalcocite, 2)
                .material(GTMaterials.Bornite, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_sapphire', vein => {
            vein.weight(30).size(3).yield(10, 20)
                .material(GTMaterials.Almandine, 3)
                .material(GTMaterials.Pyrope, 2)
                .material(GTMaterials.Sapphire, 1)
                .material(GTMaterials.GreenSapphire, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_saltpeter', vein => {
            vein.weight(20).size(3).yield(10, 20)
                .material(GTMaterials.Saltpeter, 3)
                .material(GTMaterials.Diatomite, 2)
                .material(GTMaterials.Electrotine, 2)
                .material(GTMaterials.Alunite, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_naquadah', vein => {
            vein.weight(15).size(5).yield(10, 30)
                .material(GTMaterials.Naquadah, 3)
                .material(GTMaterials.Naquadah, 2)
                .material(GTMaterials.Naquadah, 2)
                .material(GTMaterials.Plutonium239, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_tin', vein => {
            vein.weight(40).size(5).yield(30, 60)
                .material(GTMaterials.Tin, 4)
                .material(GTMaterials.Cassiterite, 2)
                .material(GTMaterials.CassiteriteSand, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_molybdenum', vein => {
            vein.weight(5).size(3).yield(30, 60)
                .material(GTMaterials.Wulfenite, 3)
                .material(GTMaterials.Molybdenite, 2)
                .material(GTMaterials.Molybdenum, 1)
                .material(GTMaterials.Powellite, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_quartz', vein => {
            vein.weight(40).size(3).yield(10, 30)
                .material(GTMaterials.Quartzite, 3)
                .material(GTMaterials.CertusQuartz, 2)
                .material(GTMaterials.Barite, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_sulfur', vein => {
            vein.weight(50).size(3).yield(10, 20)
                .material(GTMaterials.Sulfur, 3)
                .material(GTMaterials.Pyrite, 2)
                .material(GTMaterials.Sphalerite, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_magnetite', vein => {
            vein.weight(50).size(7).yield(10, 20)
                .material(GTMaterials.Magnetite, 3)
                .material(GTMaterials.VanadiumMagnetite, 2)
                .material(GTMaterials.Gold, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_garnet_tin', vein => {
            vein.weight(40).size(5).yield(20, 40)
                .material(GTMaterials.CassiteriteSand, 3)
                .material(GTMaterials.GarnetSand, 2)
                .material(GTMaterials.Asbestos, 2)
                .material(GTMaterials.Diatomite, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_lapis', vein => {
            vein.weight(40).size(3).yield(10, 30)
                .material(GTMaterials.Lazurite, 3)
                .material(GTMaterials.Sodalite, 2)
                .material(GTMaterials.Lapis, 2)
                .material(GTMaterials.Calcite, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_iron', vein => {
            vein.weight(50).size(7).yield(20, 30)
                .material(GTMaterials.Goethite, 5)
                .material(GTMaterials.Limonite, 2)
                .material(GTMaterials.Hematite, 2)
                .material(GTMaterials.Malachite, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_coal', vein => {
            vein.weight(50).size(5).yield(10, 20)
                .material(GTMaterials.Coal, 3)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_pitchblende', vein => {
            vein.weight(15).size(5).yield(10, 15)
                .material(GTMaterials.Pitchblende, 3)
                .material(GTMaterials.Pitchblende, 2)
                .material(GTMaterials.Pitchblende, 2)
                .material(GTMaterials.Uraninite, 1)
                .material(GTMaterials.Thorium, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_copper', vein => {
            vein.weight(50).size(5).yield(20, 60)
                .material(GTMaterials.Chalcopyrite, 5)
                .material(GTMaterials.Iron, 2)
                .material(GTMaterials.Pyrite, 2)
                .material(GTMaterials.Copper, 2)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_tetrahedrite', vein => {
            vein.weight(25).size(7).yield(20, 40)
                .material(GTMaterials.Tetrahedrite, 4)
                .material(GTMaterials.Copper, 2)
                .material(GTMaterials.Stibnite, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_garnet', vein => {
            vein.weight(40).size(5).yield(20, 30)
                .material(GTMaterials.GarnetRed, 3)
                .material(GTMaterials.GarnetYellow, 2)
                .material(GTMaterials.Amethyst, 2)
                .material(GTMaterials.Opal, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_redstone', vein => {
            vein.weight(50).size(5).yield(20, 30)
                .material(GTMaterials.Redstone, 3)
                .material(GTMaterials.Ruby, 2)
                .material(GTMaterials.Cinnabar, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_manganese', vein => {
            vein.weight(20).size(3).yield(20, 35)
                .material(GTMaterials.Grossular, 3)
                .material(GTMaterials.Spessartine, 2)
                .material(GTMaterials.Pyrolusite, 2)
                .material(GTMaterials.Tantalite, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_beryllium', vein => {
            vein.weight(15).size(5).yield(20, 40)
                .material(GTMaterials.Beryllium, 3)
                .material(GTMaterials.Emerald, 2)
                .material(GTMaterials.Thorium, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_monazite', vein => {
            vein.weight(15).size(5).yield(10, 20)
                .material(GTMaterials.Bastnasite, 3)
                .material(GTMaterials.Monazite, 1)
                .material(GTMaterials.Neodymium, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_tungsten', vein => {
            vein.weight(10).size(5).yield(10, 20)
                .material(GTMaterials.Scheelite, 3)
                .material(GTMaterials.Tungstate, 2)
                .material(GTMaterials.Lithium, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_nickel', vein => {
            vein.weight(40).size(7).yield(10, 20)
                .material(GTMaterials.Garnierite, 3)
                .material(GTMaterials.Nickel, 2)
                .material(GTMaterials.Cobaltite, 2)
                .material(GTMaterials.Pentlandite, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_bauxite', vein => {
            vein.weight(20).size(5).yield(20, 30)
                .material(GTMaterials.Bauxite, 2)
                .material(GTMaterials.Ilmenite, 1)
                .material(GTMaterials.Aluminium, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_diamond', vein => {
            vein.weight(40).size(3).yield(10, 60)
                .material(GTMaterials.Graphite, 4)
                .material(GTMaterials.Graphite, 3)
                .material(GTMaterials.Diamond, 3)
                .material(GTMaterials.Coal, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_mica', vein => {
            vein.weight(20).size(5).yield(10, 30)
                .material(GTMaterials.Kyanite, 3)
                .material(GTMaterials.Mica, 2)
                .material(GTMaterials.Bauxite, 2)
                .material(GTMaterials.Pollucite, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_limonite', vein => {
            vein.weight(15).size(5).yield(20, 40)
                .material(GTMaterials.Goethite, 3)
                .material(GTMaterials.Limonite, 2)
                .material(GTMaterials.Hematite, 2)
                .material(GTMaterials.Gold, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_galena', vein => {
            vein.weight(40).size(5).yield(20, 40)
                .material(GTMaterials.Galena, 3)
                .material(GTMaterials.Silver, 2)
                .material(GTMaterials.Lead, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('overworld_starven', vein => {
            vein.weight(5).size(9).yield(20, 40)
                .material(FGTCEuOreMaterials.EikonMithrite, 7)
                .material(FGTCEuOreMaterials.Lumithrite, 7)
                .material(FGTCEuOreMaterials.Durium, 5)
                .material(GTMaterials.Cooperite, 5)
                .material(FGTCEuOreMaterials.NatureAbysslinker, 1)
                .dimensions(DimMap.overworld);
        });
    }
    // The Nether
    {
        event.add('the_nether_mithrite', vein => {
            vein.weight(50).size(3).yield(10, 20)
                .material(FGTCEuOreMaterials.EikonMithrite, 5)
                .material(FGTCEuOreMaterials.Mithrite, 3)
                .material(FGTCEuOreMaterials.Lumithrite, 3)
                .material(FGTCEuOreMaterials.Durium, 1)
                .dimensions(DimMap.nether);
        });
        event.add('the_nether_quartz', vein => {
            vein.weight(40).size(3).yield(20, 40)
                .material(GTMaterials.NetherQuartz, 3)
                .material(GTMaterials.CertusQuartz, 2)
                .material(GTMaterials.Quartzite, 1)
                .material(GTMaterials.Barite, 1)
                .dimensions(DimMap.nether);
        });
        event.add('the_nether_topaz', vein => {
            vein.weight(10).size(3).yield(10, 20)
                .material(GTMaterials.BlueTopaz, 3)
                .material(GTMaterials.Topaz, 2)
                .material(GTMaterials.Chalcocite, 2)
                .material(GTMaterials.Bornite, 1)
                .dimensions(DimMap.nether);
        });
        event.add('the_nether_molybdenum', vein => {
            vein.weight(5).size(5).yield(20, 60)
                .material(GTMaterials.Wulfenite, 3)
                .material(GTMaterials.Molybdenite, 2)
                .material(GTMaterials.Molybdenum, 1)
                .material(GTMaterials.Powellite, 1)
                .dimensions(DimMap.nether);
        });
        event.add('the_nether_sulfur', vein => {
            vein.weight(50).size(3).yield(10, 20)
                .material(GTMaterials.Sulfur, 3)
                .material(GTMaterials.Pyrite, 2)
                .material(GTMaterials.Sphalerite, 1)
                .dimensions(DimMap.nether);
        });
        event.add('the_nether_tetrahedrite', vein => {
            vein.weight(50).size(7).yield(20, 40)
                .material(GTMaterials.Tetrahedrite, 4)
                .material(GTMaterials.Copper, 2)
                .material(GTMaterials.Stibnite, 1)
                .dimensions(DimMap.overworld);
        });
        event.add('the_nether_redstone', vein => {
            vein.weight(50).size(5).yield(20, 30)
                .material(GTMaterials.Redstone, 3)
                .material(GTMaterials.Ruby, 2)
                .material(GTMaterials.Cinnabar, 1)
                .dimensions(DimMap.nether);
        });
        event.add('the_nether_manganese', vein => {
            vein.weight(20).size(3).yield(20, 35)
                .material(GTMaterials.Grossular, 3)
                .material(GTMaterials.Pyrolusite, 2)
                .material(GTMaterials.Tantalite, 1)
                .dimensions(DimMap.nether);
        });
        event.add('the_nether_beryllium', vein => {
            vein.weight(30).size(5).yield(20, 40)
                .material(GTMaterials.Beryllium, 3)
                .material(GTMaterials.Emerald, 2)
                .material(GTMaterials.Thorium, 1)
                .dimensions(DimMap.nether);
        });
        event.add('the_nether_monazite', vein => {
            vein.weight(30).size(5).yield(10, 20)
                .material(GTMaterials.Bastnasite, 3)
                .material(GTMaterials.Monazite, 1)
                .material(GTMaterials.Neodymium, 1)
                .dimensions(DimMap.nether);
        });
        event.add('the_nether_limonite', vein => {
            vein.weight(30).size(3).yield(30, 60)
                .material(GTMaterials.Goethite, 3)
                .material(GTMaterials.Limonite, 2)
                .material(GTMaterials.Hematite, 2)
                .material(GTMaterials.Gold, 1)
                .dimensions(DimMap.nether);
        });
    }
    // The End
    {
        event.add('the_end_mithrite', vein => {
            vein.weight(50).size(5).yield(10, 30)
                .material(FGTCEuOreMaterials.Mithrite, 4)
                .material(FGTCEuOreMaterials.Lumithrite, 3)
                .material(FGTCEuOreMaterials.EikonMithrite, 3)
                .material(FGTCEuOreMaterials.Durium, 2)
                .dimensions(DimMap.the_end);
        });
        event.add('the_end_platinum', vein => {
            vein.weight(20).size(5).yield(20, 40)
                .material(GTMaterials.Bornite, 4)
                .material(GTMaterials.Cooperite, 3)
                .material(GTMaterials.Palladium, 2)
                .material(GTMaterials.Platinum, 1)
                .dimensions(DimMap.the_end);
        });
        event.add('the_end_magnetite', vein => {
            vein.weight(50).size(7).yield(10, 20)
                .material(GTMaterials.Magnetite, 3)
                .material(GTMaterials.VanadiumMagnetite, 2)
                .material(GTMaterials.Chromite, 2)
                .material(GTMaterials.Gold, 1)
                .dimensions(DimMap.the_end);
        });
        event.add('the_end_pitchblende', vein => {
            vein.weight(30).size(5).yield(10, 20)
                .material(GTMaterials.Pitchblende, 3)
                .material(GTMaterials.Pitchblende, 2)
                .material(GTMaterials.Pitchblende, 2)
                .material(GTMaterials.Uraninite, 1)
                .dimensions(DimMap.the_end);
        });
        event.add('the_end_tungsten', vein => {
            vein.weight(20).size(5).yield(10, 20)
                .material(GTMaterials.Scheelite, 3)
                .material(GTMaterials.Tungstate, 2)
                .material(GTMaterials.Lithium, 1)
                .dimensions(DimMap.the_end);
        });
        event.add('the_end_bauxite', vein => {
            vein.weight(40).size(3).yield(20, 30)
                .material(GTMaterials.Bauxite, 3)
                .material(GTMaterials.Ilmenite, 2)
                .material(GTMaterials.Aluminium, 1)
                .dimensions(DimMap.the_end);
        });
    }
    //Twilight Forest
    {
        event.add('tforest_mithrite', vein => {
            vein.weight(50).size(5).yield(20, 40)
                .material(FGTCEuOreMaterials.Durium, 5)
                .material(FGTCEuOreMaterials.EikonMithrite, 3)
                .material(FGTCEuOreMaterials.Lumithrite, 3)
                .material(FGTCEuOreMaterials.Mithrite, 1)
                .dimensions(DimMap.tforest);
        });
        event.add('tforest_iron', vein => {
            vein.weight(50).size(5).yield(20, 40)
                .material(GTMaterials.Goethite, 5)
                .material(GTMaterials.Limonite, 2)
                .material(GTMaterials.Hematite, 2)
                .material(GTMaterials.Malachite, 1)
                .dimensions(DimMap.tforest);
        });
        event.add('tforest_soapstone', vein => {
            vein.weight(40).size(3).yield(20, 40)
                .material(GTMaterials.Soapstone, 3)
                .material(GTMaterials.Talc, 2)
                .material(GTMaterials.GlauconiteSand, 2)
                .material(GTMaterials.Pentlandite, 1)
                .dimensions(DimMap.tforest);
        });
        event.add('tforest_manganese', vein => {
            vein.weight(20).size(3).yield(20, 40)
                .material(GTMaterials.Grossular, 3)
                .material(GTMaterials.Spessartine, 2)
                .material(GTMaterials.Pyrolusite, 2)
                .material(GTMaterials.Tantalite, 1)
                .dimensions(DimMap.tforest);
        });
        event.add('tforest_copper_tin', vein => {
            vein.weight(30).size(5).yield(20, 40)
                .material(GTMaterials.Chalcopyrite, 5)
                .material(GTMaterials.Zeolite, 2)
                .material(GTMaterials.Cassiterite, 2)
                .material(GTMaterials.Realgar, 1)
                .dimensions(DimMap.tforest);
        });
        event.add('tforest_copper', vein => {
            vein.weight(50).size(5).yield(20, 40)
                .material(GTMaterials.Chalcopyrite, 5)
                .material(GTMaterials.Iron, 2)
                .material(GTMaterials.Pyrite, 2)
                .material(GTMaterials.Copper, 2)
                .dimensions(DimMap.tforest);
        });
        event.add('tforest_magnetite', vein => {
            vein.weight(50).size(5).yield(20, 40)
                .material(GTMaterials.Magnetite, 3)
                .material(GTMaterials.VanadiumMagnetite, 2)
                .material(GTMaterials.Gold, 1)
                .dimensions(DimMap.tforest);
        });
        event.add('tforest_galena', vein => {
            vein.weight(40).size(5).yield(20, 40)
                .material(GTMaterials.Galena, 3)
                .material(GTMaterials.Silver, 2)
                .material(GTMaterials.Lead, 1)
                .dimensions(DimMap.tforest);
        });
        event.add('tforest_mica', vein => {
            vein.weight(20).size(5).yield(20, 40)
                .material(GTMaterials.Kyanite, 3)
                .material(GTMaterials.Mica, 2)
                .material(GTMaterials.Bauxite, 2)
                .material(GTMaterials.Pollucite, 1)
                .dimensions(DimMap.tforest);
        });
        event.add('tforest_tin', vein => {
            vein.weight(40).size(5).yield(20, 40)
                .material(GTMaterials.Tin, 4)
                .material(GTMaterials.Cassiterite, 2)
                .dimensions(DimMap.tforest);
        });
        event.add('tforest_gypsum', vein => {
            vein.weight(40).size(3).yield(20, 40)
                .material(GTMaterials.BasalticMineralSand, 3)
                .material(GTMaterials.GraniticMineralSand, 2)
                .material(GTMaterials.FullersEarth, 2)
                .material(GTMaterials.Gypsum, 1)
                .dimensions(DimMap.tforest);
        });
        event.add('tforest_oilsands', vein => {
            vein.weight(50).size(5).yield(20, 40)
                .material(GTMaterials.Oilsands, 5)
                .material(GTMaterials.Oilsands, 3)
                .material(GTMaterials.Oilsands, 1)
                .dimensions(DimMap.tforest);
        });
        event.add('tforest_nickel', vein => {
            vein.weight(40).size(5).yield(20, 40)
                .material(GTMaterials.Garnierite, 3)
                .material(GTMaterials.Nickel, 2)
                .material(GTMaterials.Cobaltite, 2)
                .material(GTMaterials.Pentlandite, 1)
                .dimensions(DimMap.tforest);
        });
        event.add('tforest_element_crystal', vein => {
            vein.weight(60).size(7).yield(50,100)
                .material(FGTCEuOreMaterials.EFire, 4)
                .material(FGTCEuOreMaterials.EWind, 3)
                .material(FGTCEuOreMaterials.ELightning, 2)
                .material(FGTCEuOreMaterials.EIce, 4)
                .material(FGTCEuOreMaterials.EWater, 3)
                .material(FGTCEuOreMaterials.EEarth, 2)
                .dimensions(DimMap.tforest);
        });
    }
});
