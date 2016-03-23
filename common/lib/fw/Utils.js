/**
 * Created by xiongze on 2015/8/10.
 */

define(["fw/utils/RequestUtils","fw/utils/CollectionUtils","fw/utils/FunctionUtils","fw/utils/DateUtils","fw/utils/JsonUtils","fw/utils/MathUtils","fw/utils/ObjectUtils",
    "fw/utils/StringUtils","fw/utils/XmlUtils","fw/utils/UiUtils","fw/utils/SessionUtil","fw/utils/EventUtils","fw/utils/BowerUtils","fw/utils/CoverUtils"],function(RequestUtils,CollectionUtils,FunctionUtils,DateUtils,JsonUtils,MathUtils,ObjectUtils,StringUtils,XmlUtils,UiUtils,SessionUtil,EventUtils,BowerUtils,CoverUtils){
    var Utils = {};
    Utils.requestUtils = RequestUtils;
    Utils.collectionUtils = CollectionUtils;
    Utils.functionUtils = FunctionUtils;
    Utils.dateUtils = DateUtils;
    Utils.jsonUtils = JsonUtils;
    Utils.mathUtils = MathUtils;
    Utils.objectUtils = ObjectUtils;
    Utils.stringUtils = StringUtils;
    Utils.xmlUtils = XmlUtils;
    Utils.uiUtils = UiUtils;
    Utils.sessionUtil=SessionUtil;
    Utils.eventUtils=EventUtils;
    Utils.bowerUtils=BowerUtils;
    Utils.coverUtils=CoverUtils;
    return Utils;
})
