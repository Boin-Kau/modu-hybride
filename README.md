# Modu-React-Hybride

폴더구조

- public
    - index.html
- src
    - assets : 서비스에 필요한 이미지 파일이 있는 곳입니다.
    - components : 페이지를 구성하는 요소중 반복되는 컴포넌트를 분리시키는 곳입니다.
    - containers : 서비스를 구성할 때 전체적인 부분에서 필요한 기능들이 있는 곳입니다.
    - fonts : 서비스에서 사용되는 font파일들이 있는 곳입니다.
    - reducers : 리덕스와 관련된 기능들이 있는 곳입니다.
    - shared : 여러곳에서 재사용되는 모듈이 있는 곳입니다.
    - styled : 스타일과 관련된 파일/기능이 있는 곳입니다. (Ex. css파일, 스타일드컴포넌트 등)
    - views : 페이지가 있는 곳입니다. 이곳에서 부터 페이지가 시작되고, 재사용되는 부분은 components 폴더로 이동시킵니다.
    - App.js : index.js 다음으로 실행되는 파일이고, 이곳에서 대부분의 셋팅을 진행합니다.
    - index.js : 최상위 파일입니다.