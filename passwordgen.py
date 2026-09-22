import bcrypt

def hash_password(plain_password: str) -> str:
    # 1. 平文パスワードを bytes 型にエンコード
    password_bytes = plain_password.encode('utf-8')
    
    # 2. ソルトの生成（rounds=12 が標準的）
    salt = bcrypt.gensalt(rounds=12)
    
    # 3. ハッシュ化の実行
    hashed_bytes = bcrypt.hashpw(password_bytes, salt)
    
    # 4. DB保存用に bytes 型から文字列（str）に変換して返す
    hashed_string = hashed_bytes.decode('utf-8')

    _s = ""
    for s in hashed_string:
        _s += s if s != "$" else s*2
            
    return _s


if __name__ == "__main__":
    plain_text = input("[?]:")
    
    hashed_password = hash_password(plain_text)
    print("コピーするパスワード:", hashed_password)