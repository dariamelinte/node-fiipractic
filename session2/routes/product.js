const router = require('express').Router()
const {prodController} = require('../controllers')

router.get('/', prodController.getProducts)
router.post('/', prodController.createProduct)
router.patch('/:productId', prodController.updateProduct)
router.delete('/:productId', prodController.deleteProduct)

module.exports = router