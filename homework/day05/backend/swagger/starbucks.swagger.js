/**
 * @openapi
 * /users:
 *      get:
 *          summary: 회원목록조회
 *          tags: [User]
 *          parameters:
 *              - in: query
 *                name: number
 *                type: int
 *          responses:
 *              200:
 *                 description: 성공
 *                 content:
 *                        application/json:
 *                          schema:
 *                            type: array
 *                            items:
 *                              type: object
 *                              properties:
 *                                email:
 *                                   type: string
 *                                   example: aaa@gmail.com
 *                                name:
 *                                   type: string
 *                                   example: 철수
 *                                phone:
 *                                   type: string
 *                                   example: 01012345678
 *                                prefer:
 *                                   type: string
 *                                   example: https://naver.com
 */

/**
 * @openapi
 * /5:
 *      get:
 *          summary: 커피목록조회API
 *          tags: [Coffee]
 *          parameters:
 *              - in: query
 *                name: number
 *                type: int
 *          responses:
 *              200:
 *                 description: 성공
 *                 content:
 *                        application/json:
 *                          schema:
 *                            type: array
 *                            items:
 *                              type: object
 *                              properties:
 *                                name:
 *                                   type: string
 *                                   example: 아메리카노_!
 *                                kcal:
 *                                   type: int
 *                                   example: 15
 */