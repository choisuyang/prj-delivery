const { Router } = require("express");
const router = Router();
const ctrl = require("./admin.ctrl");

router.get("/shops", ctrl.get_shops);

router.get("/shops/write", ctrl.get_shops_write);

router.post("/shops/write", ctrl.post_shops_write);

router.get("/shops/detail/:id", ctrl.get_shops_detail);

router.get("/shops/edit/:id", ctrl.get_shops_edit);

router.post("/shops/edit/:id", ctrl.post_shops_edit);

router.get("/shops/delete/:id", ctrl.get_shops_delete);

router.post("/shops/detail/:id", ctrl.add_menu);

// router.get('/shops/delete/:shop_id/:menu_id',ctrl.remove_menu);

module.exports = router;
