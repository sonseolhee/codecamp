/**
 * @swagger
 * /tokens/phone:
 *  post:
 *      summary: 토큰 생성 및 저장/전송
 *      tags: [Token]
 *      requestBody:
 *               required: true
 *               content:
 *                  application/json:
 *                      schema:
 *                             type: object
 *                             properties:
 *                                  phone:
 *                                       type: string
 *                                       required: true
 *                                       example : "01067411673"
 *      responses:
 *          '200':
 *                  description: 전화번호 오류 없을시 토큰 저장및 전송 성공
 *                  content:
 *                       application/json:
 *                          schema:
 *                            type: boolean
 *                            example: "인증번호 전송 완료 : 123456"
 */

/**
 * @swagger
 * /tokens/phone:
 *  patch:
 *      summary: 토큰 인증
 *      tags: [Token]
 *      requestBody:
 *               required: true
 *               content:
 *                  application/json:
 *                      schema:
 *                             type: object
 *                             properties:
 *                                  phone:
 *                                       type: string
 *                                       required: true
 *                                       example : "01067411673"
 *                                  token:
 *                                       type: string
 *                                       required: true
 *                                       example : "4558"
 *      responses:
 *          '200':
 *                  description: 전화번호와 토큰값 받아 인증성공 확인
 *                  content:
 *                       application/json:
 *                          schema:
 *                            type: boolean
 *                            example: true
 */
