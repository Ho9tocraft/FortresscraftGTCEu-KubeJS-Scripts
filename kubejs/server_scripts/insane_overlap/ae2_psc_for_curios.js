// AE2 Portable Storage Cells for Curios Slots
ServerEvents.tags('item', event => {
    [
        'ae2:portable_item_cell_1k', 'ae2:portable_item_cell_4k', 'ae2:portable_item_cell_16k', 'ae2:portable_item_cell_64k',
        'ae2:portable_item_cell_256k', 'megacells:portable_item_cell_1m', 'megacells:portable_item_cell_4m', 'megacells:portable_item_cell_16m',
        'megacells:portable_item_cell_64m', 'megacells:portable_item_cell_256m', 'ae2:portable_fluid_cell_1k', 'ae2:portable_fluid_cell_4k',
        'ae2:portable_fluid_cell_16k', 'ae2:portable_fluid_cell_64k', 'ae2:portable_fluid_cell_256k', 'megacells:portable_fluid_cell_1m',
        'megacells:portable_fluid_cell_4m', 'megacells:portable_fluid_cell_16m', 'megacells:portable_fluid_cell_64m',
        'megacells:portable_fluid_cell_256m', 'appmek:portable_chemical_storage_cell_1k', 'appmek:portable_chemical_storage_cell_4k',
        'appmek:portable_chemical_storage_cell_16k', 'appmek:portable_chemical_storage_cell_64k', 'appmek:portable_chemical_storage_cell_256k',
        'megacells:portable_chemical_cell_1m', 'megacells:portable_chemical_cell_4m', 'megacells:portable_chemical_cell_16m',
        'megacells:portable_chemical_cell_64m', 'megacells:portable_chemical_cell_256m', 'appbot:portable_mana_storage_cell_1k',
        'appbot:portable_mana_storage_cell_4k', 'appbot:portable_mana_storage_cell_16k', 'appbot:portable_mana_storage_cell_64k',
        'appbot:portable_mana_storage_cell_256k', 'megacells:portable_mana_cell_1m', 'megacells:portable_mana_cell_4m',
        'megacells:portable_mana_cell_16m', 'megacells:portable_mana_cell_64m', 'megacells:portable_mana_cell_256m',
        'appflux:fe_1k_portable_cell', 'appflux:fe_4k_portable_cell', 'appflux:fe_16k_portable_cell', 'appflux:fe_64k_portable_cell',
        'appflux:fe_256k_portable_cell', 'appflux:fe_1m_portable_cell', 'appflux:fe_4m_portable_cell', 'appflux:fe_16m_portable_cell',
        'appflux:fe_64m_portable_cell', 'appflux:fe_256m_portable_cell'
    ].forEach(cells => {
        event.add('curios:curio', cells);
    });
});
