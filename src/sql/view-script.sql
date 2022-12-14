CREATE OR REPLACE FORCE EDITIONABLE VIEW  "HD_REQUEST_INFO_V" ("ID", "USER_ID", "REQUEST", "SUBMITTED_DATE", "PRIORITY", "FEATURE", "HAS_TICKET") AS 
  SELECT rq.ID, rq.USER_ID, rq.REQUEST, TO_CHAR(rq.CREATED,'DD-MONTH-YYYY') SUBMITTED_DATE, 
    DECODE(rq.PRIORITY,1,'LOWEST',2,'LOW',3,'MEDIUM',4,'HIGH','HIGHEST') PRIORITY, rq.FEATURE, 
    DECODE((SELECT tc.ID FROM HD_TICKET tc WHERE tc.REQUEST_ID=rq.ID AND ROWNUM=1),NULL,'NO','YES') HAS_TICKET
FROM HD_REQUEST rq;

CREATE OR REPLACE FORCE EDITIONABLE VIEW  "HD_REQ_TICKET_V" ("TICKET_NUMBER", "CATEGORY", "IMPACT", "URGENCY", "CREATED", "TICKET_AGE", "CLOSING_STATUS", "CLOSING_DATE", "REQUEST", "REMARK", "USER_ID", "PRIORITY", "USER_RATING", "FEEDBACK", "REQUEST_ID", "TICKET_ID", "FEEDBACK_ID") AS 
  SELECT tc.TICKET_NUMBER, 
  (SELECT LOOKUP_CODE FROM HD_LOOKUP WHERE LOOKUP_TYPE='TICKET-CATEGORY' AND LOOKUP_VALUE=tc.CATEGORY) CATEGORY, 
  (SELECT LOOKUP_CODE FROM HD_LOOKUP WHERE LOOKUP_TYPE='TICKET-IMPACT' AND LOOKUP_VALUE=tc.IMPACT) IMPACT, 
  (SELECT LOOKUP_CODE FROM HD_LOOKUP WHERE LOOKUP_TYPE='TICKET-URGENCY' AND LOOKUP_VALUE=tc.URGENCY) URGENCY, 
  TO_CHAR(tc.CREATED,'DD-MON-YYYY') CREATED,
  ROUND(SYSDATE-tc.CREATED,2) TICKET_AGE,
  (SELECT LOOKUP_CODE FROM HD_LOOKUP WHERE LOOKUP_TYPE='TICKET-CLOSING-STATUS' AND LOOKUP_VALUE=NVL(tc.CLOSING_STATUS,0)) CLOSING_STATUS,
  TO_CHAR(tc.CLOSING_DATE,'DD-MON-YYYY') CLOSING_DATE, rq.REQUEST, NVL(tc.REMARK,'Follow up as request') REMARK, rq.USER_ID, 
  (SELECT LOOKUP_CODE FROM HD_LOOKUP WHERE LOOKUP_TYPE='TICKET-PRIORITY' AND LOOKUP_VALUE=rq.PRIORITY) PRIORITY,
  fe.RATING USER_RATING, fe.FEEDBACK,
  tc.REQUEST_ID, tc.ID TICKET_ID, fe.ID FEEDBACK_ID
FROM HD_TICKET tc
INNER JOIN HD_REQUEST rq ON (tc.REQUEST_ID=rq.ID)
LEFT JOIN HD_CLIENT_FEEDBACK fe ON (tc.ID=fe.TICKET_ID);

