"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const ReactDOMServer = require("react-dom/server");
const reactRedux = require("react-redux");
const toolkit = require("@reduxjs/toolkit");
const cn = require("classnames");
var PRODUCT_DETAIL_STATUS = /* @__PURE__ */ ((PRODUCT_DETAIL_STATUS2) => {
  PRODUCT_DETAIL_STATUS2["START"] = "START";
  PRODUCT_DETAIL_STATUS2["LOADING"] = "LOADING";
  PRODUCT_DETAIL_STATUS2["SUCCESS"] = "SUCCESS";
  PRODUCT_DETAIL_STATUS2["FAIL"] = "FAIL";
  return PRODUCT_DETAIL_STATUS2;
})(PRODUCT_DETAIL_STATUS || {});
const galleryType1Container = "_galleryType1Container_1wr9g_1";
const photos = "_photos_1wr9g_6";
const styles$6 = {
  galleryType1Container,
  photos
};
const GalleryType1 = () => {
  const { detailData, detailDataStatus } = reactRedux.useSelector((state) => state.productDetail);
  const { photoSizes, usagePhotoSize } = reactRedux.useSelector((state) => state.developerConstant);
  const combinedPhotoSize = photoSizes[usagePhotoSize];
  if (detailDataStatus === PRODUCT_DETAIL_STATUS.LOADING) {
    return /* @__PURE__ */ jsxRuntime.jsx("div", { children: "!Loading Componenti!" });
  }
  const detailPhotos = detailData && detailData.photoAll.split("||").filter((photo) => photo.trim() !== "");
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: styles$6.galleryType1Container, children: detailData && detailPhotos && detailPhotos.map((photo, index) => {
    const isHttps = photo.startsWith("https");
    const imgSrc = isHttps ? photo : `${combinedPhotoSize}${photo}`;
    return /* @__PURE__ */ jsxRuntime.jsx("img", { className: styles$6.photos, alt: detailData.name, src: imgSrc }, index);
  }) });
};
const productDetailInitialState = {
  detailData: null,
  detailDataStatus: PRODUCT_DETAIL_STATUS.START
};
const getDetailsData = toolkit.createAsyncThunk(
  "detailData",
  async ({
    fcode,
    productId
  }) => {
    try {
      const response = await fetch(`https://farktorapi.com/new/${fcode}/${productId}`);
      if (!response.ok) {
        throw new Error("Yanıt yok");
      }
      return await response.json();
    } catch (error) {
      throw new Error("Veri çekilemedi" + error.message);
    }
  }
);
const productDetailSlice = toolkit.createSlice({
  name: "productDetail",
  initialState: productDetailInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDetailsData.pending, (state) => {
      state.detailDataStatus = PRODUCT_DETAIL_STATUS.LOADING;
    });
    builder.addCase(
      getDetailsData.fulfilled,
      (state, action) => {
        if ("message" in action.payload && action.payload.status === "error" && action.payload.message === "Ürün Bulunamadı") {
          state.detailData = null;
        } else {
          state.detailDataStatus = PRODUCT_DETAIL_STATUS.SUCCESS;
          state.detailData = action.payload;
        }
      }
    );
    builder.addCase(getDetailsData.rejected, (state) => {
      state.detailDataStatus = PRODUCT_DETAIL_STATUS.FAIL;
    });
  }
});
const useAppSelector = reactRedux.useSelector;
const productDetailReducer = productDetailSlice.reducer;
const infoContainer = "_infoContainer_o8ib0_1";
const infoDescArea = "_infoDescArea_o8ib0_4";
const productName = "_productName_o8ib0_4";
const styles$5 = {
  infoContainer,
  infoDescArea,
  productName
};
const ProductPriceType1 = ({
  prices,
  isShowPriceMarket,
  isShowPriceOnlyMembers,
  isLoggedIn,
  fcode,
  scode
}) => {
  console.log("prices", prices);
  const { oldPrice: oldPrice2, salePrice: salePrice2, linedPrice: linedPrice2, currency, discountRate: discountRate2, isCampaign } = prices;
  const priceComparison = oldPrice2 > salePrice2 || linedPrice2 !== salePrice2 && (linedPrice2 ?? 0 > salePrice2);
  const isDiscountRateGreaterThanOrEqualToZero = discountRate2 >= 0;
  const salePriceColor = priceComparison && isDiscountRateGreaterThanOrEqualToZero ? "#cc0c2f" : "#00174f";
  const linedPriceRules = isCampaign && linedPrice2 !== oldPrice2 && linedPrice2 !== salePrice2 && (linedPrice2 ?? 0) > salePrice2;
  const oldPriceRules = oldPrice2 > salePrice2 && oldPrice2 >= (linedPrice2 ?? 0) && oldPrice2 > 0;
  if (salePrice2 === 0)
    return null;
  const formatPrice = (price2) => price2.toLocaleString("tr-TR", {
    style: "decimal",
    currency: "TRY",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  if (isShowPriceOnlyMembers && !isLoggedIn) {
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "p",
      {
        className: "price noLoginMessage",
        onClick: () => {
          if (typeof window !== void 0)
            return window.Login(fcode, scode);
        },
        children: [
          "Fiyatları görebilmek için giriş yapınız.",
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "girisYap", children: " Giriş Yap " })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "price", children: salePrice2 === oldPrice2 && linedPrice2 === salePrice2 ? /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { color: salePriceColor }, className: "salePrice", children: [
    formatPrice(salePrice2),
    currency
  ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { color: salePriceColor }, className: "salePrice", children: [
      formatPrice(salePrice2),
      " ",
      currency
    ] }),
    linedPriceRules && isDiscountRateGreaterThanOrEqualToZero && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { textDecoration: "line-through" }, className: "linedPrice", children: [
      formatPrice(linedPrice2 ?? 0),
      " ",
      currency
    ] }),
    isShowPriceMarket && oldPriceRules && isDiscountRateGreaterThanOrEqualToZero && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { textDecoration: "line-through" }, className: "oldPrice", children: [
      formatPrice(oldPrice2),
      " ",
      currency
    ] })
  ] }) });
};
const price$2 = "_price_1raax_1";
const salePrice$2 = "_salePrice_1raax_8";
const oldPrice$2 = "_oldPrice_1raax_13";
const linedPrice$2 = "_linedPrice_1raax_19";
const discountRate$3 = "_discountRate_1raax_25";
const noLoginMessage$2 = "_noLoginMessage_1raax_36";
const girisYap$2 = "_girisYap_1raax_39";
const styles$4 = {
  price: price$2,
  salePrice: salePrice$2,
  oldPrice: oldPrice$2,
  linedPrice: linedPrice$2,
  discountRate: discountRate$3,
  noLoginMessage: noLoginMessage$2,
  girisYap: girisYap$2
};
const discountRate$2 = "_discountRate_1337y_1";
const styles$3 = {
  discountRate: discountRate$2
};
const DiscountRate = ({
  isShowDiscountRate,
  discountRate: discountRate2,
  isLoggedIn,
  isShowPriceOnlyMembers,
  classname,
  isHiddenMinus = false
}) => {
  const discount = `-%${Math.trunc(discountRate2)}`;
  if (!isShowDiscountRate || !discountRate2 || isShowPriceOnlyMembers && !isLoggedIn) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("discount", styles$3.discountRate, classname), children: isHiddenMinus ? discount.substring(1) : discount });
};
const ProductPriceType2 = ({
  prices,
  isShowPriceMarket,
  isShowPriceOnlyMembers,
  isLoggedIn,
  fcode,
  scode,
  isHiddenMinus = false
}) => {
  const { oldPrice: oldPrice2, salePrice: salePrice2, linedPrice: linedPrice2, currency, discountRate: discountRate2, isCampaign } = prices;
  const priceComparison = oldPrice2 > salePrice2 || linedPrice2 !== salePrice2 && (linedPrice2 ?? 0 > salePrice2);
  const isDiscountRateGreaterThanOrEqualToZero = discountRate2 >= 0;
  const salePriceColor = priceComparison && isDiscountRateGreaterThanOrEqualToZero ? "#cc0c2f" : "#00174f";
  const linedPriceRules = isCampaign && linedPrice2 !== oldPrice2 && linedPrice2 !== salePrice2 && (linedPrice2 ?? 0) > salePrice2;
  const oldPriceRules = oldPrice2 > salePrice2 && oldPrice2 >= (linedPrice2 ?? 0) && oldPrice2 > 0;
  if (salePrice2 === 0)
    return null;
  const formatPrice = (price2) => price2.toLocaleString("tr-TR", {
    style: "decimal",
    currency: "TRY",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  if (isShowPriceOnlyMembers && !isLoggedIn) {
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "p",
      {
        className: cn(styles$4.price, styles$4.noLoginMessage),
        onClick: () => {
          if (typeof window !== void 0)
            return window.Login(fcode, scode);
        },
        children: [
          "Fiyatları görebilmek için giriş yapınız.",
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: styles$4.girisYap, children: " Giriş Yap " })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: styles$4.price, children: salePrice2 === oldPrice2 && linedPrice2 === salePrice2 ? /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { color: salePriceColor }, className: styles$4.salePrice, children: [
    formatPrice(salePrice2),
    currency
  ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { color: salePriceColor }, className: styles$4.salePrice, children: [
      formatPrice(salePrice2),
      " ",
      currency
    ] }),
    linedPriceRules && isDiscountRateGreaterThanOrEqualToZero && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { textDecoration: "line-through" }, className: styles$4.linedPrice, children: [
      formatPrice(linedPrice2 ?? 0),
      " ",
      currency
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      DiscountRate,
      {
        discountRate: discountRate2,
        isShowDiscountRate: true,
        isShowPriceOnlyMembers: false,
        isLoggedIn: true,
        classname: styles$4.discountRate,
        isHiddenMinus
      }
    ),
    isShowPriceMarket && oldPriceRules && isDiscountRateGreaterThanOrEqualToZero && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { textDecoration: "line-through" }, className: styles$4.oldPrice, children: [
      formatPrice(oldPrice2),
      " ",
      currency
    ] })
  ] }) });
};
const price$1 = "_price_jqikn_1";
const salePrice$1 = "_salePrice_jqikn_8";
const discountRate$1 = "_discountRate_jqikn_17";
const oldPrice$1 = "_oldPrice_jqikn_24";
const linedPrice$1 = "_linedPrice_jqikn_30";
const noLoginMessage$1 = "_noLoginMessage_jqikn_37";
const girisYap$1 = "_girisYap_jqikn_40";
const styles$2 = {
  price: price$1,
  salePrice: salePrice$1,
  discountRate: discountRate$1,
  oldPrice: oldPrice$1,
  linedPrice: linedPrice$1,
  noLoginMessage: noLoginMessage$1,
  girisYap: girisYap$1
};
const ProductPriceType3$1 = ({
  prices,
  isShowPriceMarket,
  isShowPriceOnlyMembers,
  isLoggedIn,
  fcode,
  scode,
  isHiddenMinus = false
}) => {
  const { oldPrice: oldPrice2, salePrice: salePrice2, linedPrice: linedPrice2, currency, discountRate: discountRate2, isCampaign } = prices;
  const priceComparison = oldPrice2 > salePrice2 || linedPrice2 !== salePrice2 && (linedPrice2 ?? 0 > salePrice2);
  const isDiscountRateGreaterThanOrEqualToZero = discountRate2 >= 0;
  const salePriceColor = priceComparison && isDiscountRateGreaterThanOrEqualToZero ? "#cc0c2f" : "#00174f";
  const linedPriceRules = isCampaign && linedPrice2 !== oldPrice2 && linedPrice2 !== salePrice2 && (linedPrice2 ?? 0) > salePrice2;
  const oldPriceRules = oldPrice2 > salePrice2 && oldPrice2 >= (linedPrice2 ?? 0) && oldPrice2 > 0;
  if (salePrice2 === 0)
    return null;
  const formatPrice = (price2) => price2.toLocaleString("tr-TR", {
    style: "decimal",
    currency: "TRY",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  if (isShowPriceOnlyMembers && !isLoggedIn) {
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "p",
      {
        className: cn(styles$2.price, styles$2.noLoginMessage),
        onClick: () => {
          if (typeof window !== void 0)
            return window.Login(fcode, scode);
        },
        children: [
          "Fiyatları görebilmek için giriş yapınız.",
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: styles$2.girisYap, children: " Giriş Yap " })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: styles$2.price, children: salePrice2 === oldPrice2 && linedPrice2 === salePrice2 ? /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { color: salePriceColor }, className: styles$2.salePrice, children: [
    formatPrice(salePrice2),
    currency
  ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { color: salePriceColor }, className: styles$2.salePrice, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        DiscountRate,
        {
          discountRate: discountRate2,
          isShowDiscountRate: true,
          isShowPriceOnlyMembers: false,
          isLoggedIn: true,
          classname: styles$2.discountRate,
          isHiddenMinus
        }
      ),
      formatPrice(salePrice2),
      " ",
      currency
    ] }),
    linedPriceRules && isDiscountRateGreaterThanOrEqualToZero && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { textDecoration: "line-through" }, className: styles$2.linedPrice, children: [
      formatPrice(linedPrice2 ?? 0),
      " ",
      currency
    ] }),
    isShowPriceMarket && oldPriceRules && isDiscountRateGreaterThanOrEqualToZero && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { textDecoration: "line-through" }, className: styles$2.oldPrice, children: [
      formatPrice(oldPrice2),
      " ",
      currency
    ] })
  ] }) });
};
const price = "_price_1xzlw_1";
const salePrice = "_salePrice_1xzlw_8";
const discountRate = "_discountRate_1xzlw_17";
const oldPrice = "_oldPrice_1xzlw_24";
const linedPrice = "_linedPrice_1xzlw_29";
const noLoginMessage = "_noLoginMessage_1xzlw_36";
const girisYap = "_girisYap_1xzlw_39";
const styles$1 = {
  price,
  salePrice,
  discountRate,
  oldPrice,
  linedPrice,
  noLoginMessage,
  girisYap
};
const ProductPriceType3 = ({
  prices,
  isShowPriceMarket,
  isShowPriceOnlyMembers,
  isLoggedIn,
  fcode,
  scode,
  isHiddenMinus = false
}) => {
  const { oldPrice: oldPrice2, salePrice: salePrice2, linedPrice: linedPrice2, currency, discountRate: discountRate2, isCampaign } = prices;
  const priceComparison = oldPrice2 > salePrice2 || linedPrice2 !== salePrice2 && (linedPrice2 ?? 0 > salePrice2);
  const isDiscountRateGreaterThanOrEqualToZero = discountRate2 >= 0;
  const salePriceColor = priceComparison && isDiscountRateGreaterThanOrEqualToZero ? "#cc0c2f" : "#00174f";
  const linedPriceRules = isCampaign && linedPrice2 !== oldPrice2 && linedPrice2 !== salePrice2 && (linedPrice2 ?? 0) > salePrice2;
  const oldPriceRules = oldPrice2 > salePrice2 && oldPrice2 >= (linedPrice2 ?? 0) && oldPrice2 > 0;
  if (salePrice2 === 0)
    return null;
  const formatPrice = (price2) => price2.toLocaleString("tr-TR", {
    style: "decimal",
    currency: "TRY",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  if (isShowPriceOnlyMembers && !isLoggedIn) {
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "p",
      {
        className: cn(styles$1.price, styles$1.noLoginMessage),
        onClick: () => {
          if (typeof window !== void 0)
            return window.Login(fcode, scode);
        },
        children: [
          "Fiyatları görebilmek için giriş yapınız.",
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: styles$1.girisYap, children: " Giriş Yap " })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: styles$1.price, children: salePrice2 === oldPrice2 && linedPrice2 === salePrice2 ? /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { color: salePriceColor }, className: styles$1.salePrice, children: [
    formatPrice(salePrice2),
    currency
  ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    isShowPriceMarket && oldPriceRules && isDiscountRateGreaterThanOrEqualToZero && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { textDecoration: "line-through" }, className: styles$1.oldPrice, children: [
      formatPrice(oldPrice2),
      " ",
      currency
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { color: salePriceColor }, className: styles$1.salePrice, children: [
      formatPrice(salePrice2),
      " ",
      currency,
      /* @__PURE__ */ jsxRuntime.jsx(
        DiscountRate,
        {
          discountRate: discountRate2,
          isShowDiscountRate: true,
          isShowPriceOnlyMembers: false,
          isLoggedIn: true,
          classname: styles$1.discountRate,
          isHiddenMinus
        }
      )
    ] }),
    linedPriceRules && isDiscountRateGreaterThanOrEqualToZero && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { textDecoration: "line-through" }, className: styles$1.linedPrice, children: [
      formatPrice(linedPrice2 ?? 0),
      " ",
      currency
    ] })
  ] }) });
};
const getSelectedCampaign = (campaigns, scode, isMobile, modelCode) => {
  if (campaigns.length === 0)
    return void 0;
  const availableCampTypes = [13, 8, 7, 9];
  return campaigns.find(
    (item) => item.status == 1 && availableCampTypes.includes(item.type) && item.storeCode === scode && item.modelCode === modelCode && isMatchedDeviceForCampaign(isMobile, item.device)
  );
};
const calcCampaign = (firmPriceSale, discountRate2) => {
  return firmPriceSale - firmPriceSale * discountRate2 / 100;
};
const getFirmPriceSale = (priceSales, firmPriceSaleType) => {
  const firmPriceSale = firmPriceSaleType === "1" ? priceSales.priceSale : priceSales[`priceSale${firmPriceSaleType}`];
  if (firmPriceSale === void 0)
    return priceSales.priceSale;
  return firmPriceSale;
};
const isMatchedDeviceForCampaign = (isMobile, campaignOnDevice) => {
  let isMatched = false;
  switch (isMobile) {
    case 0:
      isMatched = campaignOnDevice === "0" || campaignOnDevice === "1";
      break;
    case 1:
      isMatched = campaignOnDevice === "0" || campaignOnDevice === "2" || campaignOnDevice === "4";
      break;
    default:
      isMatched = false;
      break;
  }
  return isMatched;
};
const calcDiscountRate = ({
  isCampaign,
  campaign,
  priceMarket,
  firmPriceSale
}) => {
  let discountRate2 = 0;
  if (isCampaign) {
    if ((campaign == null ? void 0 : campaign.condition) === 1) {
      discountRate2 = (campaign == null ? void 0 : campaign.discount) / firmPriceSale * 100;
    } else if ((campaign == null ? void 0 : campaign.condition) === 0) {
      discountRate2 = campaign == null ? void 0 : campaign.discount;
    } else {
      discountRate2 = (priceMarket - firmPriceSale) / priceMarket * 100;
    }
  } else {
    if (priceMarket <= firmPriceSale) {
      discountRate2 = 0;
    } else {
      discountRate2 = (priceMarket - firmPriceSale) / priceMarket * 100;
    }
  }
  return discountRate2;
};
const getCampaignInfos = (item, firmPriceSale, scode, isMobile, currency) => {
  const { campaigns, priceMarket, modelCode } = item;
  const campaign = getSelectedCampaign(campaigns, scode, isMobile, modelCode);
  const isCampaign = !!campaign;
  const discountRate2 = calcDiscountRate({
    isCampaign,
    campaign,
    priceMarket,
    firmPriceSale
  });
  if (isCampaign) {
    const calculatedCampaignPrice = calcCampaign(firmPriceSale, discountRate2);
    return {
      oldPrice: priceMarket,
      linedPrice: firmPriceSale,
      salePrice: calculatedCampaignPrice,
      isCampaign,
      campaignName: (campaign == null ? void 0 : campaign.name) ?? "",
      discountRate: discountRate2,
      currency
    };
  } else {
    return {
      oldPrice: priceMarket,
      linedPrice: null,
      salePrice: firmPriceSale,
      isCampaign,
      campaignName: "",
      discountRate: discountRate2,
      currency
    };
  }
};
const getProductData = async (fcode, productId) => {
  try {
    const response = await fetch(`https://farktorapi.com/new/${fcode}/${productId}`);
    if (!response.ok) {
      throw new Error("Yanıt yok");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Veri çekilemedi" + error.message);
  }
};
const Info = () => {
  const { detailData } = reactRedux.useSelector((state) => state.productDetail);
  const {
    fcode,
    priceSaleType,
    priceType,
    scode,
    firmCurrency,
    viewMobile,
    isShowPriceOnlyMembers,
    memberIsLogin,
    isShowPriceMarket
  } = useAppSelector((state) => state.developerConstant);
  const priceTypes = {
    1: ProductPriceType1,
    2: ProductPriceType2,
    3: ProductPriceType3$1,
    4: ProductPriceType3
  };
  const PriceType = priceTypes[priceType];
  const firmPriceSale = detailData && getFirmPriceSale(
    {
      priceSale: detailData.priceSale,
      priceSale2: detailData.priceSale2,
      priceSale3: detailData.priceSale3,
      priceSale4: detailData.priceSale4,
      priceSale5: detailData.priceSale5
    },
    priceSaleType
  );
  const priceObject = detailData && firmPriceSale && getCampaignInfos(
    {
      campaigns: detailData.campaigns,
      priceMarket: detailData.priceMarket,
      modelCode: detailData.modelCode
    },
    firmPriceSale,
    scode,
    viewMobile,
    firmCurrency
  );
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: styles$5.infoContainer, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: styles$5.infoDescArea, children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: styles$5.productName, children: detailData && detailData.name }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { style: { padding: "22px 0px", fontSize: 12 }, children: "Fiyat" }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { style: { padding: "22px 0px", fontSize: 12 }, children: "Renk" }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { style: { padding: "22px 0px", fontSize: 12 }, children: "Beden" }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { style: { padding: "22px 0px", fontSize: 12 }, children: detailData && /* @__PURE__ */ jsxRuntime.jsx(
      PriceType,
      {
        isHiddenMinus: priceType == 1 || priceType == 2,
        fcode,
        scode,
        isShowPriceMarket,
        isShowPriceOnlyMembers,
        isLoggedIn: memberIsLogin,
        prices: priceObject
      }
    ) })
  ] }) });
};
const productWrapperContainer = "_productWrapperContainer_1svbj_1";
const productWrapperContentArea = "_productWrapperContentArea_1svbj_1";
const galleryTypesArea = "_galleryTypesArea_1svbj_5";
const infoArea = "_infoArea_1svbj_9";
const styles = {
  productWrapperContainer,
  productWrapperContentArea,
  galleryTypesArea,
  infoArea
};
function ProductWrapper() {
  const { firmColor, adjustedFontSize } = useAppSelector((state) => state.developerConstant);
  const generalFontSizeStyle = `html{font-size:${adjustedFontSize}px; --color:${firmColor}}`;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: styles.productWrapperContainer, children: [
    /* @__PURE__ */ jsxRuntime.jsx("style", { children: generalFontSizeStyle }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: styles.productWrapperContentArea, children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: styles.galleryTypesArea, children: /* @__PURE__ */ jsxRuntime.jsx(GalleryType1, {}) }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: styles.infoArea, children: /* @__PURE__ */ jsxRuntime.jsx(Info, {}) })
    ] })
  ] });
}
function App({ store }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "App", children: /* @__PURE__ */ jsxRuntime.jsx(reactRedux.Provider, { store, children: /* @__PURE__ */ jsxRuntime.jsx(ProductWrapper, {}) }) });
}
const constantValueInitialState = {
  usagePhotoSize: "large",
  fcode: "Fr-5500191",
  scode: "Fr-5500191-1",
  productId: 78283,
  photoSizes: {
    small: "https://images.farktorcdn.com/img/164x246/Library/Upl/5500191/Product/",
    medium: "https://images.farktorcdn.com/img/652x978/Library/Upl/5500191/Product/",
    large: "https://images.farktorcdn.com/img/800x1200/Library/Upl/5500191/Product/",
    orj: "https://images.farktorcdn.com/img/1200x1800/Library/Upl/5500191/Product/"
  },
  priceSaleType: "1",
  priceType: 4,
  firmCurrency: "TL",
  viewMobile: 0,
  isShowPriceMarket: true,
  isShowDiscountRate: true,
  isShowPriceOnlyMembers: false,
  memberIsLogin: true,
  firmColor: "#00174f",
  adjustedFontSize: 16
};
const firmSettingsValueSlice = toolkit.createSlice({
  name: "developerConstantValue",
  initialState: constantValueInitialState,
  reducers: {}
});
const developerConstantReducer = firmSettingsValueSlice.reducer;
const createStore = (detailData, firmSettings) => toolkit.configureStore({
  preloadedState: {
    productDetail: {
      detailData,
      detailDataStatus: PRODUCT_DETAIL_STATUS.START
    },
    developerConstant: { ...constantValueInitialState, ...firmSettings }
  },
  reducer: {
    productDetail: productDetailReducer,
    developerConstant: developerConstantReducer
  }
});
async function render(fcode, productId) {
  const productData = await getProductData(fcode, productId);
  const firmSettings = constantValueInitialState;
  const store = createStore(productData);
  const html = ReactDOMServer.renderToString(/* @__PURE__ */ jsxRuntime.jsx(App, { store }));
  return { html, productData, firmSettings };
}
exports.render = render;
