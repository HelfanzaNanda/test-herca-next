## Installation

buka terminal anda

```bash
git clone https://github.com/HelfanzaNanda/test-herca-next.git

# masuk project
cd test-api-next

# install vendor
npm install

# running
npm run dev
```

 
## CREDENTIALS

```python
# ADMIN
username : admin@example.com
password : password

# CUSTOMER
username : customer@example.com
password : password
```


# link simulator payment
## Virtual Account

Permata VA : https://simulator.sandbox.midtrans.com/openapi/va/index

BCA VA : https://simulator.sandbox.midtrans.com/bca/va/index

MANDIRI VA : https://simulator.sandbox.midtrans.com/openapi/va/index?bank=mandiri

BNI VA : https://simulator.sandbox.midtrans.com/bni/va/index

BRI VA : https://simulator.sandbox.midtrans.com/openapi/va/index

CIMB VA : https://simulator.sandbox.midtrans.com/openapi/va/index

## Convenience Store

Indomaret : https://simulator.sandbox.midtrans.com/indomaret/phoenix/index

Alfamart : https://simulator.sandbox.midtrans.com/alfamart/index

## E-Wallet

QRIS : https://simulator.sandbox.midtrans.com/qris/index

Gopay : https://simulator.sandbox.midtrans.com/gopay/ui/index
    - User not registered: 123450001
    - User is blocked: 123450002

## Card Payments

Expiry Month : 01 (or any month)

Expiry Year : 2025 (or any future year)

CVV	: 123

OTP/3DS	: 112233

Card Number	: Refer to table given below

## Accepted 3D Secure Card

| Bank | Card Number     |                |
| :-------- | :------- | :------------------------- |
| Mandiri |  |  |
| Full Authentication	 | 4617 0069 5974 6656*	 | 5573 3810 7219 6900 |
| Attempted Authentication	 | 4617 0017 4194 2101*	 | 5573 3819 9982 5417 |
| BNI |  |  |
| Full Authentication	 | 4105 0586 8948 1467 | 5264 2210 3887 4659 |
| Attempted Authentication	 | 4105 0525 4151 2148	 | 5264 2249 7176 1016 |
| BNI Private Label		 | 1946 4159 8148 7684*	 | |
| BCA |  |  |
| Full Authentication	 | 4773 7760 5705 1650	 | 5229 9031 3685 3172 |
| Attempted Authentication	 | 4773 7738 1098 1190 | 5229 9073 6430 3610 |
| BRI |  |  |
| Full Authentication	 | 4365 0263 3573 7199 | 5520 0298 7089 9100 |
| Attempted Authentication	 | 4365 0278 6723 2690 | 5520 0254 8646 8439 |

## Atau bisa dilihat langsung disini 
https://docs.midtrans.com/docs/testing-payment-on-sandbox
