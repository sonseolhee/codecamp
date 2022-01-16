// const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer, gql }  from 'apollo-server'


// The GraphQL schema(<=>swagger)
const myTypeDefs = gql`
  type BoardReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    # fetchBoards: BoardReturn => 객체 한개를 의미
    fetchBoards: [BoardReturn] # => 배열 안에 객체 1개 이상
  }

  type Mutation {
    createBoard(writer: String, title: String, contents: String): String
  }

`;



// A map of functions which return data for the schema.
const myResolvers = {
  Query: {
    fetchBoards: (_, args) => {
      //데이터베이스에서 데이터를 꺼내오는 로직

      return [
        {number : 1, writer : '글쓴이1', title : '제목1', contents : '내용1'},
        {number : 2, writer : '글쓴이2', title : '제목2', contents : '내용2'},
        {number : 3, writer : '글쓴이3', title : '제목3', contents : '내용3'},
        {number : 4, writer : '글쓴이4', title : '제목4', contents : '내용4'}
    ]
    }
  },

  
  
  Mutation: {
    createBoard: (_, args) => {
      //데이터베이스에 데이터를 저장하는 로직
      
      console.log(args)


      return "등록에 성공하였습니다."
    }
  }

  
};



const server = new ApolloServer({
  typeDefs: myTypeDefs,
  resolvers: myResolvers
  /**
   * typeDefs,
   * resolvers
   * shorthand property
   */
  
});







server.listen(3000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});