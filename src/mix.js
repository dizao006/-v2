//这里是混合，目的是抽离出来组件中共有的方法，数据，生命周期等等
export const mix1 = {

    mounted() {
        console.log("这里是生命周期的混合方法")
    },

}
export const mix2 = {
    methods: {
        shows() {
            console.log("测试")
        }
    }

}