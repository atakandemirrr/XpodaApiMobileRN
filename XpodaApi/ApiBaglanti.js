import axios from 'axios';
import { parseStringPromise } from 'xml2js';

const soapRequest = async (action, body) => {
  const url = 'http://apiadresiniz/Services/CustomerApi.svc';
  const soapAction = `http://tempuri.org/ICustomerApi/${action}`;

  const xmlData = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://tempuri.org/">
      <soapenv:Header/>
      <soapenv:Body>
        ${body}
      </soapenv:Body>
    </soapenv:Envelope>
  `;

  try {
    const response = await axios.post(url, xmlData, {
      headers: {
        'Content-Type': 'text/xml',
        'SOAPAction': soapAction,
      },
    });

    const jsonResponse = await parseStringPromise(response.data);
    return jsonResponse;
  } catch (error) {
    console.error('Hata:', error);
    return null;
  }
};
/*Giriş işlemi*/
export const loginRequest = async (username, password) => {
  const body = `
    <tns:Login>
      <tns:username>${username}</tns:username>
      <tns:userpsw>${password}</tns:userpsw>
      <tns:customerid>-1</tns:customerid>
    </tns:Login>
  `;
  return await soapRequest('Login', body);
};
/*Çıkış işlemi*/
export const logoffRequest = async (username, password, ticket) => {
  const body = `
    <tns:Logoff>
      <tns:username>${username}</tns:username>
      <tns:userpsw>${password}</tns:userpsw>
      <tns:ticket>${ticket}</tns:ticket>
      <tns:customerid>-1</tns:customerid>
    </tns:Logoff>
  `;
  return await soapRequest('Logoff', body);
};
/*Insert işlemi*/
export const insertDataRequest = async (username, password, currencyCode, banknoteSelling, banknoteBuying, ticket) => {
  const body = `
    <tem:Insert xmlns:tem="http://tempuri.org/" xmlns:q6="http://schemas.microsoft.com/2003/10/Serialization/Arrays">
      <tem:username>${username}</tem:username>
      <tem:userpsw>${password}</tem:userpsw>
      <tem:apiid>2</tem:apiid>
      <tem:param>
        <q6:string>${banknoteBuying}</q6:string>
        <q6:string>${banknoteSelling}</q6:string>
        <q6:string>'${currencyCode}'</q6:string>
        <q6:string>'${username}'</q6:string>
        <q6:string>'${username}'</q6:string>
      </tem:param>
      <tem:customerid>-1</tem:customerid>
      <tem:ticket></tem:ticket>
    </tem:Insert>
  `;
  return await soapRequest('Insert', body);
};

export default {
  loginRequest,
  logoffRequest,
  insertDataRequest,
};


/* örnek insert sorgusu strin alanlar apide '' ile gönderilecek dikkat et
INSERT INTO [dbo].[MERKEZBANKAKURLAR]
           ([CreateDate]
           ,[CurrencyCode]
           ,[BanknoteSelling]
           ,[CreateUser]
           ,[UpdateDate]
           ,[UpdateUser]
           ,[IntegrationID]
           ,[ProjectID]
           ,[FormTypeID]
           ,[LineNumber]
           ,[RecordGuid]
           ,[usd])
     VALUES
           (GETDATE()
           ,$Param[2]
           ,$Param[1]
           ,(SELECT  [UserID] FROM [XPODA].[dbo].[XPODA_CLIENT_USERS] WHERE [UserName] = $Param[3])
           ,GETDATE()
           ,(SELECT  [UserID] FROM [XPODA].[dbo].[XPODA_CLIENT_USERS] WHERE [UserName] = $Param[4])
           ,0
           ,2025
           ,3699
           ,0
           ,NEWID()
           ,$Param[0])
*/ 