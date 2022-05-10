import axios from 'axios';
import ApplicationConfig from '../config/ApplicationConfig';
class CalculatorService {
    getProducts() {
        return axios.get(ApplicationConfig.CALCULTOR_API_BASE_URL);
    }

    getTotal(productQuantityDetail) {
        return axios.get(ApplicationConfig.CALCULTOR_API_BASE_URL + "/get-total", {
            params: {
                'productId': productQuantityDetail.productId,
                'numOfCartons': productQuantityDetail.numOfCartons,
                'numOfUnits': productQuantityDetail.numOfUnits
            }
        });
    }

    getPriceForUnits(ProductsUnitRangeDetails) {
        return axios.post(ApplicationConfig.CALCULTOR_API_BASE_URL + "/get-product-units-prices", ProductsUnitRangeDetails)

    }


}



export default new CalculatorService()