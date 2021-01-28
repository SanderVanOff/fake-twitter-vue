<template>
    <div class="post">
        <div class="post__avatar">
            <img src="../assets/avatar.jpg" alt="" class="post-avatar__img">
        </div>
        <div class="post__main post-main">
            <div class="post-main__user mb-2">
                <span class="post-main__username mr-3">Username</span>
                <span class="post-main__nickname mr-3">@nickName</span>
                <span class="post-main__date mr-3">28.01.2021</span>
            </div>
            <div class="post-main__text mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id placeat obcaecati nisi accusamus, vitae esse!</div>
            <div class="post-main__image mb-2">
                <img src="../assets/3.jpg" alt="" class="post-main__img">
            </div>
            <div class="post-main__bottom">
                <b-icon icon="heart" class="post-main__like"></b-icon>
                <span class="post-main__like-count ml-2">0</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.post {
    display: flex;
    padding: 15px;
    border-top: 1px solid rgb(235, 238, 240);
}
.post__avatar {
    margin-right: 15px;
}

.post-avatar__img {
  height: 50px;
  width: 50px;
  border-radius: 9999px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 0px 2px inset;
}

.post-main {
    display: flex;
    flex-direction: column;
}
.post-main__username {
    color: rgb(15, 20, 25);
    font-size: 15px;
    font-weight: 700;
    line-height: 1.3125;
    overflow-wrap: break-word;
}
.post-main__nickname, .post-main__date {
    font-size: 15px;
    font-weight: 400;
    color: rgb(91, 112, 131);
    line-height: 1.3125;
    overflow-wrap: break-word;
}
.post-main__text {
    color: rgb(15, 20, 25);
    font-size: 15px;
    font-weight: 400;
    line-height: 1.3125;
    overflow-wrap: break-word;
}
.post-main__img {
    width: 100%;
    height: 100%;
    border: 1px solid rgb(196, 207, 214);
    border-radius: 16px;
}
.post-main__bottom {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.post-main__like {
    transform: scale(1);
    cursor: pointer;
    transition: 0.2s ease-in-out;
}
.post-main__like:hover {
    transform: scale(1.2);
}
</style>