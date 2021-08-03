const models = require("../../models");

exports.get_shops_detail = async (req, res) => {
  const shop = await models.Shops.findOne({
    where: { id: req.params.id },
    include: ["Menu"],
  });

  let cartList = {}; //장바구니 리스트
  //쿠키가 있는지 확인해서 뷰로 넘겨준다
  let cartLength = 0;
  let sameShops = true;
  if (typeof req.cookies.cartList !== "undefined") {
    //장바구니데이터
    cartList = JSON.parse(unescape(req.cookies.cartList));

    cartLength = Object.keys(cartList).length;
  }

  res.render("shops/detail.html", { shop, cartLength });
};
