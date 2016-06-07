-- 수정된 부분 : 
-- member -> base addr 추가,  posname naming rule 적용 mposname, MNO 시퀀스 적용
-- comment -> 댓글 일련번호 컬럼명 수정 col -> cno
-- file -> ftitle 컬럼명 수정 -> fori_name
-- 게시판
ALTER TABLE BOARD
	DROP FOREIGN KEY FK_TEAM_TO_BOARD; -- 팀 -> 게시판

-- 게시판
ALTER TABLE BOARD
	DROP FOREIGN KEY FK_MEMBER_TO_BOARD; -- 회원 -> 게시판

-- 회원
ALTER TABLE MEMBER
	DROP FOREIGN KEY FK_TEAM_TO_MEMBER; -- 팀 -> 회원

-- 댓글
ALTER TABLE COMMENT
	DROP FOREIGN KEY FK_BOARD_TO_COMMENT; -- 게시판 -> 댓글

-- 댓글
ALTER TABLE COMMENT
	DROP FOREIGN KEY FK_MEMBER_TO_COMMENT; -- 회원 -> 댓글

-- 첨부파일
ALTER TABLE FILEATTACH
	DROP FOREIGN KEY FK_BOARD_TO_FILEATTACH; -- 게시판 -> 첨부파일

-- 게시판
ALTER TABLE BOARD
	DROP PRIMARY KEY; -- 게시판 기본키

-- 회원
ALTER TABLE MEMBER
	DROP PRIMARY KEY; -- 회원 기본키

-- 팀
ALTER TABLE TEAM
	DROP PRIMARY KEY; -- 팀 기본키

-- 댓글
ALTER TABLE COMMENT
	DROP PRIMARY KEY; -- 댓글 기본키

-- 첨부파일
ALTER TABLE FILEATTACH
	DROP PRIMARY KEY; -- 첨부파일 기본키

-- 회원 유니크 인덱스
DROP INDEX UIX_MEMBER ON MEMBER;

-- 팀 유니크 인덱스
DROP INDEX UIX_TEAM ON TEAM;

-- 게시판
DROP TABLE IF EXISTS BOARD RESTRICT;

-- 회원
DROP TABLE IF EXISTS MEMBER RESTRICT;

-- 팀
DROP TABLE IF EXISTS TEAM RESTRICT;

-- 댓글
DROP TABLE IF EXISTS COMMENT RESTRICT;

-- 첨부파일
DROP TABLE IF EXISTS FILEATTACH RESTRICT;


-- 게시판
CREATE TABLE BOARD (
	BNO       INTEGER      NOT NULL COMMENT '게시글일련번호', -- 게시글일련번호
	TNO       INTEGER      NOT NULL COMMENT '소속팀일련번호', -- 소속팀일련번호
	MNO       INTEGER      NULL     COMMENT '작성자', -- 작성자
	BTYPE     CHAR(1)      NOT NULL COMMENT '게시글종류', -- 게시글종류
	BTITLE    VARCHAR(255) NOT NULL COMMENT '게시글제목', -- 게시글제목
	BCONTENT  TEXT         NOT NULL COMMENT '게시글내용', -- 게시글내용
	BREG_DATE DATETIME     NULL     COMMENT '게시글등록일자', -- 게시글등록일자
	BMOD_DATE DATETIME     NULL     COMMENT '게시글수정일자', -- 게시글수정일자
	BVIEW_CNT INTEGER      NULL     COMMENT '게시글조회수' -- 게시글조회수
)
COMMENT '게시판';

-- 게시판
ALTER TABLE BOARD
	ADD CONSTRAINT PK_BOARD -- 게시판 기본키
		PRIMARY KEY (
			BNO -- 게시글일련번호
		);
ALTER TABLE BOARD
	MODIFY COLUMN BNO INTEGER NOT NULL AUTO_INCREMENT COMMENT '게시글일련번호';
-- 회원
CREATE TABLE MEMBER (
	MNO          INTEGER      NOT NULL COMMENT '회원일련번호', -- 회원일련번호
	TNO          INTEGER      NULL     COMMENT '소속팀일련번호', -- 소속팀일련번호
	MNAME        VARCHAR(50)  NOT NULL COMMENT '이름', -- 이름
	MPATH        VARCHAR(255) NULL     COMMENT '사진', -- 사진
	MEMAIL       VARCHAR(40)  NOT NULL COMMENT '이메일', -- 이메일
	MPNO         VARCHAR(30)  NOT NULL COMMENT '휴대폰', -- 휴대폰
	MGENDER      CHAR(1)      NOT NULL COMMENT '성별', -- 성별
	MPASS        VARCHAR(20)  NOT NULL COMMENT '암호', -- 암호
	MBASE_ADDR	 VARCHAR(255) NOT NULL COMMENT '주소', -- 기본주소
	MDET_ADDR    VARCHAR(255) NOT NULL COMMENT '상세주소', -- 상세주소
	MBIRTH       DATE         NOT NULL COMMENT '생일', -- 생일
	MLEADER_YN   CHAR(1)      NULL     COMMENT '팀장여부', -- 팀장여부
	MENTER_YN    CHAR(1)      NULL     COMMENT '팀가입여부', -- 팀가입여부
	MAPPLY_YN    CHAR(1)      NULL     COMMENT '입단신청여부', -- 입단신청여부
	MPLAY_CNT    INTEGER      NULL     COMMENT '참여회수', -- 참여회수
	MGOAL_CNT    INTEGER      NULL     COMMENT '득점', -- 득점
	MSUPPORT_CNT INTEGER      NULL     COMMENT '도움', -- 도움
	MLOSS_CNT    INTEGER      NULL     COMMENT '실점', -- 실점
	MPOSNAME      VARCHAR(50)  NOT NULL COMMENT '포지션명' -- 포지션명
)
COMMENT '회원';

-- 회원
ALTER TABLE MEMBER
	ADD CONSTRAINT PK_MEMBER -- 회원 기본키
		PRIMARY KEY (
			MNO -- 회원일련번호
		);
		
ALTER TABLE MEMBER
	MODIFY COLUMN MNO INTEGER NOT NULL AUTO_INCREMENT COMMENT '회원일련번호';
	
-- 회원 유니크 인덱스
CREATE UNIQUE INDEX UIX_MEMBER
	ON MEMBER ( -- 회원
		MEMAIL ASC -- 이메일
	);
	
-- 팀
CREATE TABLE TEAM (
	TNO       INTEGER      NOT NULL COMMENT '소속팀일련번호', -- 소속팀일련번호
	TNAME     VARCHAR(50)  NOT NULL COMMENT '팀명', -- 팀명
	TEPATH    VARCHAR(255) NOT NULL COMMENT '팀앰블럼사진', -- 팀앰블럼사진
	TREG_DATE DATETIME     NULL     COMMENT '팀생성일', -- 팀생성일
	TMEM_CNT  INTEGER      NOT NULL COMMENT '활동인원', -- 활동인원
	TCONTENT  TEXT         NOT NULL COMMENT '팀소개', -- 팀소개
	TPOINT     VARCHAR(255) NOT NULL COMMENT '활동위치', -- 활동위치
	TLATITUDE  DOUBLE       NOT NULL COMMENT '활동지역위도', -- 활동지역위도
	TLONGITUDE DOUBLE       NOT NULL COMMENT '활동지역경도' -- 활동지역경도
)
COMMENT '팀';

-- 팀
ALTER TABLE TEAM
	ADD CONSTRAINT PK_TEAM -- 팀 기본키
		PRIMARY KEY (
			TNO -- 소속팀일련번호
		);

-- 팀 유니크 인덱스
CREATE UNIQUE INDEX UIX_TEAM
	ON TEAM ( -- 팀
		TNAME ASC -- 팀명
	);

ALTER TABLE TEAM
	MODIFY COLUMN TNO INTEGER NOT NULL AUTO_INCREMENT COMMENT '소속팀일련번호';

-- 댓글
CREATE TABLE COMMENT (
	CNO       INTEGER  NOT NULL COMMENT '댓글일련번호', -- 댓글일련번호
	BNO       INTEGER  NOT NULL COMMENT '게시글일련번호', -- 게시글일련번호
	MNO       INTEGER  NULL     COMMENT '작성자', -- 작성자
	CCONTENT  TEXT     NOT NULL COMMENT '댓글내용', -- 댓글내용
	CREG_DATE DATETIME NULL     COMMENT '댓글등록일자' -- 댓글등록일자
)
COMMENT '댓글';

-- 댓글
ALTER TABLE COMMENT
	ADD CONSTRAINT PK_COMMENT -- 댓글 기본키
		PRIMARY KEY (
			CNO -- 댓글일련번호
		);
		
ALTER TABLE COMMENT
	MODIFY COLUMN CNO INTEGER NOT NULL AUTO_INCREMENT COMMENT '댓글일련번호';

-- 첨부파일
CREATE TABLE FILEATTACH (
	FNO        INTEGER      NOT NULL COMMENT '첨부파일일련번호', -- 첨부파일일련번호
	BNO        INTEGER      NOT NULL COMMENT '게시글일련번호', -- 게시글일련번호
	FORI_NAME  VARCHAR(255) NULL     COMMENT '첨부파일제목', -- 첨부파일제목
	FREAL_NAME VARCHAR(255) NULL     COMMENT '저장된파일이름', -- 저장된파일이름
	FPATH      VARCHAR(255) NULL     COMMENT '첨부파일경로', -- 첨부파일경로
	FTHUMB     VARCHAR(255) NULL     COMMENT '갤러리썸네일' -- 갤러리썸네일
)
COMMENT '첨부파일';

-- 첨부파일
ALTER TABLE FILEATTACH
	ADD CONSTRAINT PK_FILEATTACH -- 첨부파일 기본키
		PRIMARY KEY (
			FNO -- 첨부파일일련번호
		);

-- 게시판
ALTER TABLE BOARD
	ADD CONSTRAINT FK_TEAM_TO_BOARD -- 팀 -> 게시판
		FOREIGN KEY (
			TNO -- 소속팀일련번호
		)
		REFERENCES TEAM ( -- 팀
			TNO -- 소속팀일련번호
		);
		
ALTER TABLE FILEATTACH
	MODIFY COLUMN FNO INTEGER NOT NULL AUTO_INCREMENT COMMENT '첨부파일일련번호';

-- 게시판
ALTER TABLE BOARD
	ADD CONSTRAINT FK_MEMBER_TO_BOARD -- 회원 -> 게시판
		FOREIGN KEY (
			MNO -- 작성자
		)
		REFERENCES MEMBER ( -- 회원
			MNO -- 회원일련번호
		);

-- 회원
ALTER TABLE MEMBER
	ADD CONSTRAINT FK_TEAM_TO_MEMBER -- 팀 -> 회원
		FOREIGN KEY (
			TNO -- 소속팀일련번호
		)
		REFERENCES TEAM ( -- 팀
			TNO -- 소속팀일련번호
		);

-- 댓글
ALTER TABLE COMMENT
	ADD CONSTRAINT FK_BOARD_TO_COMMENT -- 게시판 -> 댓글
		FOREIGN KEY (
			BNO -- 게시글일련번호
		)
		REFERENCES BOARD ( -- 게시판
			BNO -- 게시글일련번호
		);

-- 댓글
ALTER TABLE COMMENT
	ADD CONSTRAINT FK_MEMBER_TO_COMMENT -- 회원 -> 댓글
		FOREIGN KEY (
			MNO -- 작성자
		)
		REFERENCES MEMBER ( -- 회원
			MNO -- 회원일련번호
		);

-- 첨부파일
ALTER TABLE FILEATTACH
	ADD CONSTRAINT FK_BOARD_TO_FILEATTACH -- 게시판 -> 첨부파일
		FOREIGN KEY (
			BNO -- 게시글일련번호
		)
		REFERENCES BOARD ( -- 게시판
			BNO -- 게시글일련번호
		);
		
--member 컬럼추가
alter table member add mapply_tno integer not null default '0'; 