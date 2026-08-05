MysticalAgricultureStartupEvents.crop(event => {
    const cropProudSoul = new Crop(
        'slashblade:proudsoul',  // ID of Crop
        CropTier.THREE,          // Tier of Crop
        CropType.RESOURCE,       // Type of Crop
        CropTextures.GEM_CROP_TEXTURES, // Textures
        0x0087FF, // Colors
        'slashblade:proudsoul_trapezohedron',
    );
    event.registry.register(cropProudSoul);
});
