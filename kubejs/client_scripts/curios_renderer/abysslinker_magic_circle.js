CuriosJSEvents.registerRenderer(event => {
    const ResLc = Java.loadClass('net.minecraft.resources.ResourceLocation');
    event.register('kubejs:abysslinker_magic_circle', ctx => {
        const entity = ctx.slotContext.entity();

        ctx.matrixStack.pushPose();
        CuriosRenderer.translateIfSneaking(ctx.matrixStack, entity);

        // ----- 位置調整 -----
        // translate: X=左右, Y=上下, Z=前後
        ctx.matrixStack.translate(0.0, 0.0, 0.45);
        // 背中に貼る向き
        ctx.matrixStack.mulPose(RotationAxis.YP.deg(0));
        // ----- サイズ調整 -----
        ctx.matrixStack.scale(2.5, 2.5, 0.02);
        // 見た目
        const model = Client.modelManager.getModel(
            new ModelResourceLocation(ctx.stack.id, 'inventory')
        );

        Client.itemRenderer.render(
            ctx.stack,
            'none',
            false,
            ctx.matrixStack,
            ctx.renderTypeBuffer,
            ctx.light,
            OverlayTexture.NO_OVERLAY,
            model
        );
        ctx.matrixStack.popPose();
    });
});
