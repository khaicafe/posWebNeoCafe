<template> 
    <!-- display print bill   -->
     <div id="printDefault" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; width: 560px; background-color: white !important; /*position: absolute; left: 0; bottom: 0;*/" aria-hidden="false">
        <div>
          <div style="border-radius: 0px !important;line-height: 24px !important;">
            <div class="col-md-12 fix-padding row">
              <div class="col-md-3">
                <img src="@/assets/images/logos/favicon.svg"  style="width: 150px; height: 150px; margin-top: 20px;">
              </div>
              <div class="col-md-8" style="margin-left: 20px; margin-top: 20px;">
                <p style="font-weight: bold; font-size: 26px;">{{ 'orderPrint.shopname' }}</p>
                <p style="font-size: 22px;">{{ 'orderPrint.address' }}</p>
                <p style="font-size: 22px;">{{ 'orderPrint.phone' }}</p>
              </div>
            </div>
            <div>
              <hr style="border-top: 2px dashed #bbb;">
            </div>
            <div>
              <div class="col-md-12 fix-padding row" style="line-height: 14px !important;">
                <div class="col-md-6">
                  <p style="text-align: left; font-size: 22px; margin-left: 20px;"> Mã hóa đơn: {{ 'orderPrint.bill_id' }}</p>
                </div>
                <div class="col-md-6">
                  <p style="text-align: right; font-size: 22px;"> Ngày: {{ 'orderPrint.date' }}</p>
                </div>
              </div>
              <div class="col-md-12 fix-padding row">
                <div class="col-md-8" style="line-height: 24px !important;">
                  <p style="text-align: left; font-size: 22px; margin-left: 20px;"> Nhân viên: {{ 'orderPrint.staff' }}</p>
                  <p style="text-align: left; font-size: 22px; margin-left: 20px;"> HTTT: {{ 'orderPrint.trans_type' }}</p>
                  <p style="text-align: left; font-size: 22px; margin-left: 20px;"> Nguồn ĐH: {{ 'orderPrint.chanel_name '}} <a ng-if="orderPrint.foodapp_order_id && orderPrint.foodapp_order_id !== '' && orderPrint.package_id == 0">#{{ 'orderPrint.foodapp_order_id' }}</a></p>
                  <p style="text-align: left; font-size: 22px; margin-left: 20px;"> Ghi chú: {{ 'orderPrint.note' }}</p>
                </div>
                <div class="col-md-4" style="line-height: 28px !important;">
                  <p style="text-align: right; font-size: 36px; font-weight: bold;">{{ 'orderPrint.table' }}</p>
                </div>
                <div ng-if="orderPrint.package_id > 0" class="col-md-12" style="line-height: 24px !important;">
                  <p style="text-align: left; font-size: 22px; margin-left: 20px;"> Địa chỉ: {{ 'orderPrint.shipping_address' }}</p>
                </div>
                <div ng-if="orderPrint.package_id > 0" class="col-md-12" style="line-height: 24px !important;">
                  <p style="text-align: left; font-size: 22px; margin-left: 20px;"> Người giao hàng: {{ 'orderPrint.shiper_name' }}</p>
                </div>
                <div ng-if="orderPrint.package_id > 0" class="col-md-12" style="line-height: 24px !important;">
                  <p style="text-align: left; font-size: 22px; margin-left: 20px;"> Hóa đơn đã thanh toán</p>
                </div>
              </div>
            </div>
            <div>
              <hr style="border-top: 2px dashed #bbb;">
            </div>
            <div style="line-height: 14px !important;">
              <div class="col-md-12 fix-padding row">
                <div class="col-md-5">
                  <p style="text-align: left; font-size: 22px; margin-left: 20px; font-weight: bold;"> Sản phẩm</p>
                </div>
                <div class="col-md-2">
                  <p style="text-align: right; font-size: 22px; font-weight: bold;"> Giá</p>
                </div>
                <div class="col-md-1">
                  <p style="text-align: right; font-size: 22px; font-weight: bold;"> SL</p>
                </div>
                <div class="col-md-4">
                  <p style="text-align: right; font-size: 22px; font-weight: bold;"> Thành tiền</p>
                </div>
              </div>
              <div>
                <hr style="border-top: 1px solid #bbb;">
              </div>
              <div ng-repeat="item in orderPrint.items track by $index" class="col-md-12 fix-padding row" style="line-height: 22px !important;">
                <div class="col-md-5">
                  <p style="text-align: left; font-size: 22px; margin-left: 20px;"> {{ 'item.product_name' }}</p>
                  <p style="text-align: left; font-size: 18px; margin-left: 20px;"> {{ 'item.stringExtra' }}</p>
                </div>
                <div class="col-md-2">
                  <p style="text-align: right; font-size: 22px;"> {{ 'item.paid_price' }}</p>
                </div>
                <div class="col-md-1">
                  <p style="text-align: right; font-size: 22px;"> {{ 'item.quantity' }}</p>
                </div>
                <div class="col-md-4">
                  <p style="text-align: right; font-size: 22px;"> {{ 'item.price' }}</p>
                </div>
              </div>
              <div>
                <hr style="border-top: 1px dotted #bbb;">
              </div>
              <div class="col-md-12 fix-padding row" style="line-height: 14px !important;">
                <div class="col-md-4">
                  <p style="text-align: left; font-size: 22px; margin-left: 20px; font-weight: bold;"> Tổng</p>
                  <p style="text-align: left; font-size: 22px; margin-left: 20px; font-weight: bold;"> Phí dịch vụ</p>
                  <p style="text-align: left; font-size: 22px; margin-left: 20px; font-weight: bold;"> Giảm giá</p>
                  <p style="text-align: left; font-size: 22px; font-weight: bold; margin-left: 20px;"> Thanh toán</p>
                </div>
                <div class="col-md-4">
                </div>
                <div class="col-md-4">
                  <p style="text-align: right; font-size: 22px; font-weight: bold;"> {{ 'orderPrint.subTotal' }}</p>
                  <p style="text-align: right; font-size: 22px; font-weight: bold;"> {{ 'orderPrint.fee_service' }}</p>
                  <p style="text-align: right; font-size: 22px; font-weight: bold;"> {{ 'orderPrint.price_discount' }}</p>
                  <p style="text-align: right; font-size: 22px; font-weight: bold;"> {{ 'orderPrint.total_price' }}</p>
                </div>
              </div>
              <div>
                <hr style="border-top: 1px dotted #bbb;">
              </div>
              <div class="col-md-12 fix-padding row" style="line-height: 14px !important;">
                <div class="col-md-12">
                  <p style="text-align: left; font-size: 22px; margin-left: 20px; font-weight: bold;"> Wifi: {{ 'orderPrint.wifi_name' }}</p>
                  <p style="text-align: left; font-size: 22px; margin-left: 20px; font-weight: bold;"> Pass: {{ 'orderPrint.wifi_pass' }}</p>
                </div>
                <div class="col-md-8"></div>
              </div>
              <div>
                <hr style="border-top: 1px dotted #bbb;">
              </div>
              <div style="line-height: 14px !important;">
             </div>
              <div style="line-height: 14px !important;">
                <p style="text-align: center; font-size: 24px;"> {{ 'orderPrint.footer1' }}</p>
                <p style="text-align: center; font-size: 24px;">Powered by Neo Cafe</p>
              </div>
              <div class="col-md-12 fix-padding row">
                <div class="col-md-2"></div>
                <div class="col-md-4">
                  <img src="@/assets/images/logos/qrNeocafe1.jpg"  style="width: 300px; height: 300px; margin-left: 30px;">
                </div>
                <div class="col-md-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>