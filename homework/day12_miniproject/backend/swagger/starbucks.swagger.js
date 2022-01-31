/**
 * @swagger
 * /starbucks:
 *  get:
 *      summary: 메뉴 받아오기
 *      tags: [Starbucks]
 *      responses:
 *          '200':
 *                description: 스타벅스 커피 목록
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                _id:
 *                                    type: string
 *                                    required: true
 *                                    example: 61ee3757e83a2d5361b2501e
 *                                name:
 *                                    type: string
 *                                    required: true
 *                                    example : 나이트로 콜드 브루
 *                                img:
 *                                    type: string
 *                                    required: true
 *                                    example : https://image.istarbucks.co.kr/upload/stor...
 */
